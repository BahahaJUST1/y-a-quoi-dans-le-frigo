import { EntityManager } from '@mikro-orm/mysql';

function ngramsDecomposer(
  word: string,
  ngramSize: number
): string[] {
  // remove unwanted characters (SQL will « partir en carafe » if ' is found)
  word = word.replace("'", '"')

  if (word.length <= ngramSize) {
    return [word];
  }

  const ngrams: string[] = [];
  for (let i = 0; i < word.length - (ngramSize-1); i++) {
    ngrams.push(word.substring(i, i+ngramSize).toLowerCase());
  }

  return ngrams;
}


function sqlNgramsFinder(
  word: string,
  ngramSize: number,
  tableName: string,
  userId: number
): string {
  const ngrams = ngramsDecomposer(word, ngramSize);

  let query: string = `
    SELECT name FROM ${tableName} 
    WHERE (is_global_item = true OR user_id = ${userId})
    AND deleted_at IS null
    AND ( name LIKE '%${ngrams[0]}%'
  `
  if (ngrams.length > 1) {
    ngrams.forEach((ngram: string, index: number) => {
      // do not deal with first ngram twice
      if (index) {
        query += `\nOR name LIKE '%${ngram}%'`
      }
    });
  }
  return query + ");";
}


async function findPossiblySimilarNames(
  word: string,
  tableName: string,
  ngramSize: number,
  em: EntityManager,
  userId: number
): Promise<string[] | null> {

  const query = sqlNgramsFinder(word, ngramSize, tableName, userId);
  const result = await em.execute(query);

  if (!result || !result.length) {
    return null;
  }

  return result.map(data => data.name);
}


export async function getSimilarNames(
  word: string,
  tableName: string,
  ngramSize: number,
  em: EntityManager,
  userId: number
): Promise<string[] | null> {

  const candidates: string[] | null = await findPossiblySimilarNames(word, tableName, ngramSize, em, userId);
  if (!candidates || !candidates.length) {
    return null;
  }

  const ngramsWordToFind: string[] = ngramsDecomposer(word, ngramSize);
  const finalCandidates: string[] = [];

  candidates.forEach((candidate: string) => {
    // decompose every candidate into ngrams
    const ngramsCandidate: string[] = ngramsDecomposer(candidate, ngramSize);

    let similarities: number = 0;
    // check for every ngrams of candidate if it is a section of the word we want to find similar ones
    ngramsCandidate.forEach((ngram: string) => {
      if (ngramsWordToFind.includes(ngram)) {
        similarities++;
      }
    });
    // make an average of the number of similar ngrams we found
    const sameNgramsRatio = similarities/ngramsCandidate.length;
    if (sameNgramsRatio >= 0.40) {
      finalCandidates.push(candidate);
    }
  });

  return finalCandidates
}
