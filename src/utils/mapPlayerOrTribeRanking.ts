interface PlayerOrTribe {
  rankAtt?: number;
  rankDef?: number;
  rankSup?: number;
  rankTotal?: number;
  rank?: number;
}

const mapPlayerOrTribeRanking = (
  obj: PlayerOrTribe,
  val: string,
  def: number = 0
): number => {
  switch (val) {
    case 'scoreAtt':
      return obj.rankAtt ?? def;
    case 'scoreDef':
      return obj.rankDef ?? def;
    case 'scoreSup':
      return obj.rankSup ?? def;
    case 'scoreTotal':
      return obj.rankTotal ?? def;
    case 'points':
      return obj.rank ?? def;
    default:
      return def;
  }
};

export default mapPlayerOrTribeRanking;
