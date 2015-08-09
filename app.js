var request = require('request');
var CronJob = require('cron').CronJob;
var parser = require('xml2json');

var parser_options = {object: true};

var URL = "http://webservice.recruit.co.jp/shingaku/school/v2?pref_cd=12&key=hogehoge";

new CronJob('* * * * * *', function() {
  request.get(URL, function(err, res, deta) {
        if (!err && res.statusCode === 200) {
          var json = parser.toJson(deta, parser_options);
          var school = json.results.school;
          school.forEach(function (element) {
              console.log(element.name);
          });
        } else {
          console.log(err);
        }
    }
  );
}, null, true);



