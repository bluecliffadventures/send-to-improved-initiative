import cash, { Cash } from "cash-dom";
import { StatBlock } from "./StatBlock";
import { compileFunction } from "vm";

export const extractStatBlock = () => {
  const doc = cash(document);
  const statBlockElement = doc.find(".mon-stat-block");

  const statBlock: Partial<StatBlock> = {
    Name: getNameFrom(statBlockElement),
    HP: getHpFrom(statBlockElement),
    AC: getAcFrom(statBlockElement),
    Speed: getSpeeds(statBlockElement)
  };

  return statBlock;
}

function getNameFrom(element: Cash) {
  return element.find(".mon-stat-block__name a").text().trim();
}

function getAcFrom(element: Cash) {
  return getAttribute(element, "Armor Class");
}

function getHpFrom(element: Cash) {
  return getAttribute(element, "Hit Points");
}

function getAttribute(element: Cash, attributeName: string) {
  const label = element.find(".mon-stat-block__attribute-label")
    .filter((_, e: Element) => e.innerHTML.trim() == attributeName).first();
  
  const value = parseInt(label.parent().find(".mon-stat-block__attribute-data-value").text().trim());
  const notes = label.parent().find(".mon-stat-block__attribute-data-extra").text().trim();
  return {
    Value: value,
    Notes: notes
  };
}

function getSpeeds(element: Cash) {
  const label = element.find(".mon-stat-block__attribute-label")
    .filter((_, e: Element) => e.innerHTML.trim() == "Speed").first();
  const commaSeparatedSpeeds = label.parent().find(".mon-stat-block__attribute-data-value").text().trim();
  return commaSeparatedSpeeds.split(",").map(s => s.trim());
}

