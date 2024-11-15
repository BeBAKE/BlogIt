import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { JSONArray } from "hono/utils/types";
import { SummaryBodyMaxLength, SummaryTitleMaxLength } from "../constants/Quill";
export interface DeltaToText extends Prisma.JsonObject {
  ops : Array<{ insert: string | object }>
}

// type DeltaToText = Array<{ insert: string | object }>


export const deltaToText = (delta: DeltaToText,heading : "title"|"body"): string => {
  const sanitizeInsert = (insert: any): string => {
    if (typeof insert === 'string') {
      return insert.replace(/[\n\r\t]/g, '');
    }
    return ''; 
  };

  const slicedDelta = delta.ops.slice(0,20)
  let fullText = slicedDelta
    .map(op => sanitizeInsert(op?.insert)) 
    .join(' ')
    .trim();
  
  const wordsArray = fullText.split(/\s+/); 
  const limitedWordsLength = heading === "title" ? SummaryTitleMaxLength : SummaryBodyMaxLength
  const limitedWords = wordsArray.join(' ').trim().substring(0,limitedWordsLength)

  return limitedWords;
} 
