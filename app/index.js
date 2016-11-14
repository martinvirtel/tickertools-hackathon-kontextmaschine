require('./main.css');
require('quill/dist/quill.core.css');
require('quill/dist/quill.snow.css');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');

var $         = require('jquery');
var _         = require('underscore');
var quill     = require('quill');
var bootstrap = require('bootstrap');

var data = require("json!./data.json");

var satz=_.template("<span class='satz'>Für ein Produkt im Wert von <%= o.currency[0] %> muss eine durchschnittliche Fabrikarbeiterin in <%= o.country[0] %> nach einer Berechnung der Schweizer Bank UBS etwa <%= days %> Tage arbeiten."); 

window.$=$;
window.data=data;

$('[data-toggle="popover"]').popover();

var matches={ country: [], currency: [] }

$.each(data,function(k,v) {
    var vs=k.split("_");
    matches.country.push(vs[0]);
    matches.currency.push(vs[1]);
});

var prefix   = { country : "",
                 currency: "([0-9]+) "
               }

$.each(matches, function(k,v) {
    matches[k]=RegExp(prefix[k]+"\\b(" + v.join("|")+ ")\\b","i");
});



quill.register('modules/helpme', function(quill, options) {
  sentinels={} 

  quill.on('text-change', function() {
	var cursor = quill.getSelection();
    var text = quill.getText();
    matched={}
    $.each(matches,function(k,v) {
        found=v.exec(text)
        if (found !== null) {
            var st=found.index;
            var en=st+found[0].length;
            inside=false;
            if (cursor && (cursor.index <= en) && (cursor.index >= st)) {
                inside=true;
            };
            matched[k]=found;
        }
    });
    if (_.keys(matched).length == 2) {
            make_context(matched);
    } else {
        $('[data-toggle="popover"]').popover("hide");
    }
  });
});


function make_context(object) {

    var key=object.country[1].toLowerCase() + "_" + object.currency[2].toLowerCase();
    if (typeof data[key] != "undefined") {
        var p=$('[data-toggle="popover"]');
        p.attr("data-content",satz({o: object, days: Math.floor(parseFloat(object.currency[1])/(data[key]/300.0) )}));
        p.popover("show");
    }

} 


var editor = new quill('#editor', {
        theme: 'snow',
		modules: {
			'helpme' : { sentinel: 'xxx+' }
		}
});

