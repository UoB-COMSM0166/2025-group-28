class BehaviourMonitor {
  constructor(difficultySettings) {
    this.difficultySettings = difficultySettings;
    this.aggressiveRating = difficultySettings.baseAggressiveRating;
    this.defensiveRating = difficultySettings.baseDefensiveRating;
    this.baseThreatMult = difficultySettings.baseThreatMult;
    this.roomsCleared = 0;
    this.timesMobsFired = 0;
  }

  getTotalDeaths() {
    return playerADeathCount + playerBDeathCount;
  }

  getRoomsCleared() {
    return this.roomsCleared;
  }

  updateRoomsCleared() {
    this.roomsCleared++;
  }

  updateTimesMobsFired(count) {
    this.timesMobsFired += count;
  }

  getBehaviourProfile() {
    if (coop) {
      return this.getCoopBehaviour();
    } else {
      return this.getSoloBehaviour();
    }
  }

  getSoloBehaviour() {
    let highHeatFreq = playerA.getHighHeatFrequency();
    let overheatFreq = playerA.getOverheatFrequency();
    let dodgePercentage = playerA.timesHurt / Math.max(1, this.timesMobsFired);
    let aggressiveness = ((highHeatFreq * 3) + (overheatFreq * 5)) - playerA.timesHurt;
    if (aggressiveness < 0) aggressiveness = 0;
    let defensiveness = (this.roomsCleared / Math.max(1, playerA.timesHurt)) * (1 - dodgePercentage);
    return {
      // Threshold for 'aggressive' rating increases as number of rooms cleared increases to account for greater difficulty in later rooms
      aggressive: aggressiveness > this.aggressiveRating + this.roomsCleared / 10,
      // Threshold for 'defensive' rating also decreases down to a min of base defensive rating / 1.5
      defensive: defensiveness > Math.max(this.defensiveRating / 1.5, this.defensiveRating - this.roomsCleared / 10),
    };
  }

  getCoopBehaviour() {
    let p1HighHeatFreq = playerA.getHighHeatFrequency();
    let p1OverheatFreq = playerA.getOverheatFrequency();
    let p2HighHeatFreq = playerB.getHighHeatFrequency();
    let p2OverheatFreq = playerB.getHighHeatFrequency();
    let p1DodgePercentage = playerA.timesHurt / Math.max(1, this.timesMobsFired);
    let p2DodgePercentage = playerB.timesHurt / Math.max(1, this.timesMobsFired);
    let p1Aggressiveness = ((p1HighHeatFreq * 3) + (p1OverheatFreq * 5)) - playerA.timesHurt;
    let p2Aggressiveness = ((p2HighHeatFreq * 3) + (p2OverheatFreq * 5)) - playerB.timesHurt;
    if (p1Aggressiveness < 0) p1Aggressiveness = 0;
    if (p2Aggressiveness < 0) p2Aggressiveness = 0;
    let p1Defensiveness = (this.roomsCleared / Math.max(1, playerA.timesHurt)) * (1 - p1DodgePercentage);
    let p2Defensiveness = (this.roomsCleared / Math.max(1, playerB.timesHurt)) * (1 - p2DodgePercentage);
    let weightedAggressiveness = (p1Aggressiveness + p2Aggressiveness) / 2;
    let weightedDefensiveness = (p1Defensiveness + p2Defensiveness) / 2;
    return {
      aggressive: weightedAggressiveness > this.aggressiveRating + this.roomsCleared / 10,
      defensive: weightedDefensiveness > Math.max(this.defensiveRating / 1.5, this.defensiveRating - this.roomsCleared / 10),
    };
  }

  getRoomThreatCap() {
    if (coop) baseThreatLimit = 20;
    let baseThreat = (baseThreatLimit * this.baseThreatMult) + this.roomsCleared * threatScaleFactor;
    let deathPenalty = this.getTotalDeaths() * -2; // Decreases difficulty in coop the more times players die
    let aggressionBonus = 0;
    let defensiveBonus = 0;
    if (this.getBehaviourProfile().aggressive) aggressionBonus = 5;
    if (this.getBehaviourProfile().defensive) defensiveBonus = 3;
    return Math.max(5, baseThreat + deathPenalty + aggressionBonus + defensiveBonus);
  }
}