const express = require('express');
const fetch = require('node-fetch');
const nhlRoutes = express.Router();
const NHL_API = 'https://api-web.nhle.com/v1';

async function fetchNhl(path) {
  const response = await fetch(NHL_API + path, { timeout: 8000 });
  if (!response.ok) {
    throw new Error('NHL returned HTTP ' + response.status);
  }
  return response.json();
}

function teamName(team) {
  return [team.placeName && team.placeName.default,
    team.commonName && team.commonName.default].filter(Boolean).join(' ') || team.abbrev;
}

// Keep NHL requests on the server: the browser uses the website's own API origin.
nhlRoutes.get('/summary', async function (req, res) {
  try {
    const [player, schedule] = await Promise.all([
      fetchNhl('/player/8471214/landing'),
      fetchNhl('/club-schedule-season/WSH/now').catch(() => null)
    ]);
    const featured = player.featuredStats || {};
    const season = featured.regularSeason && featured.regularSeason.subSeason;
    const career = player.careerTotals && player.careerTotals.regularSeason;
    if (!player.firstName || !player.lastName || !career || !Number.isFinite(career.goals)) {
      throw new Error('NHL player data is incomplete');
    }
    const hasSeason = season && Number.isFinite(season.goals) && Number.isFinite(season.gamesPlayed);
    const scheduleAvailable = !!(schedule && Array.isArray(schedule.games));
    const nextGame = scheduleAvailable ? schedule.games
      .filter(game => ['FUT', 'PRE'].includes(game.gameState) &&
        game.gameScheduleState === 'OK' && Date.parse(game.startTimeUTC) >= Date.now())
      .sort((a, b) => Date.parse(a.startTimeUTC) - Date.parse(b.startTimeUTC))[0] : null;

    res.json({
      playerName: player.firstName.default + ' ' + player.lastName.default,
      teamName: 'Washington Capitals',
      // During the offseason the NHL may still feature the completed season.
      season: hasSeason ? String(featured.season) : null,
      seasonGoals: hasSeason ? season.goals : null,
      seasonGamesPlayed: hasSeason ? season.gamesPlayed : null,
      goalsPerGame: hasSeason && season.gamesPlayed > 0 ? season.goals / season.gamesPlayed : null,
      careerGoals: career.goals,
      scheduleAvailable,
      nextGame: nextGame ? {
        startTimeUTC: nextGame.startTimeUTC,
        awayTeam: teamName(nextGame.awayTeam),
        homeTeam: teamName(nextGame.homeTeam)
      } : null
    });
  } catch (error) {
    console.error('NHL summary unavailable:', error.message);
    res.status(502).json({ message: 'NHL statistics are temporarily unavailable. Please try again later.' });
  }
});

module.exports = nhlRoutes;
