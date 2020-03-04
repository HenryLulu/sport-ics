const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const ics = require('ics');
const { writeFileSync } = require('fs')

const needLabels = process.argv.slice(2);

const parseMatchInfo = $li => {
  const labels = ($li.attr('label') || '').split(',');
  const innerText = $li.text();
  const time = moment($li.data('time'));
  const reg = /^(\d+:\d+)\s+([^\s]+)\s+([^\s]+)\s+-\s+([^\s]+)/;
  const ma = innerText.match(reg);
  if (!ma) {
    return null;
  }
  return {
    labels,
    time,
    name: ma[2],
    home: ma[3].split('(')[0],
    away: ma[4].split('(')[0],
  };
};

const generateIcs = data => {
  const icsData = data.map(matchInfo => {
    const { time, name, home, away } = matchInfo;
    return {
      start: time.format('YYYY-M-D-H-m').split('-'),
      title: `${home}-${away}(${name})`,
      duration: { minutes: 120 },
    };
  });
  const { error, value } = ics.createEvents(icsData);
  if (error) {
    console.log(error);
    return;
  }
  console.log(value);
  writeFileSync(`${__dirname}/output/event.ics`, value);
  console.log('*ics已生成*')
};

request({
  url: 'https://www.zhibo8.cc/',
}, (err, res, body) => {
  const $ = cheerio.load(body.toString());
  const $lis = $('.schedule_container .box .content li');
  const infos = [];
  $lis.each((index, element) => {
    const $li = $(element);
    const matchInfo = parseMatchInfo($li);
    if (!matchInfo) {
      return;
    }
    const { labels } = matchInfo;
    const needed = labels.some(label => needLabels.indexOf(label) > -1);
    if (!needed && needLabels && needLabels.length !== 0) {
      return;
    }
    infos.push(matchInfo);
  });
  generateIcs(infos);
})
