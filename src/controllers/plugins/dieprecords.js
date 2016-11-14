exports.controlladder = (function adder(controller) {
    controller.add('tanks', function (context) {

        function worker(tanks) {

            var tanknames = tanks.names.join(", ")

            context.bot.sendMsgLog({
                context: context,
                to: context.channelID,
                message: "```" + tanknames + "```"
            });
        }

        getTanksDict(worker)


    }, 'For when you want a list of possible tanks you can use to submit records to the website')
})

function getTanksDict(callback) {

    function worker(tanksjson) {
        var tanksNameId = {}
        var tanksIdName = {}
        var tanksnames = []
        for (var i = 0; i < tanksjson.length; i++) {
            tanksNameId[tanksjson[i].tankname] = tanksjson[i].id
            tanksIdName[tanksjson[i].id] = tanksjson[i].tankname
            tanksnames.push(tanksjson[i].tankname)
        }
        tanksnames.sort()
        console.log(tanksnames)
        callback({'nameid': tanksNameId, 'idname': tanksIdName, 'names': tanksnames})


    }


    getWebsiteInfos("https://dieprecords.moepl.eu/api/tanks", worker)
}


function getWebsiteInfos(url, callback) {
    var http = require('https');
    return http.get(url, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });

}