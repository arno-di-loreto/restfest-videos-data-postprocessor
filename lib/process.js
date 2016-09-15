'use strict';

function getWiki(wiki, speaker, year, kind) {
  let result = [];
  console.log('looking for %s %s %s', speaker, year, kind);
  for (let i = 0; i < wiki.length; i++) {
    const talk = wiki[i];
    if (talk.speaker.localeCompare(speaker) === 0 &&
        talk.year.localeCompare(year) === 0 &&
        talk.type.localeCompare(kind) === 0) {
      result.push(talk);
    }
  }
  return result;
}

/**
 * @description Upgrades Vimeo data with wiki data
 * @param {Object[]} wiki Wiki data
 * @param {Object[]} vimeo Vimeo data
 * @return {Object[]} Upgraded data
 */
function process(wiki, vimeo) {
  const result = [];
  for (let i = 0; i < vimeo.length; i++) {
    const video = vimeo[i];
    const w = getWiki(wiki, video.speaker, video.year, video.kind);
    if (w.length === 1) {
      console.log('update %s to %s', w[0].title, w[0].title);
      console.log('update %s to %s', video.description, w[0].description);
      video.vimeoTitle = video.title;
      video.title = w[0].title;
      video.description = w[0].description;
      if (w[0].keywords) {
        console.log('adding keywords', w[0].keywords);
        video.keywords = w[0].keywords;
      }
      if (w[0].slidesUrl) {
        console.log('adding slidesUrl', w[0].slidesUrl);
        video.slidesUrl = w[0].slidesUrl;
      }
    }
    else if (w.length > 1) {
      console.log('more than one talk found for video', video.title, w);
    }
    else {
      console.log('no talk for %s %s', video.year, video.title);
    }
    result.push(video);
  }
  return result;
}

exports.process = process;
