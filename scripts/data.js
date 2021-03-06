define(["jQuery", "kendo", "config", "utils"], function ($, kendo, config, utils) {
    var _wcfSchemaData = function (data) {
            return data.value;
        },

        _wcfSchemaTotal = function (data) {
            return data["odata.count"];
        };
    
    var DataSourceConfig = function (url, sortField, options) {
        this.transport = {
            read: url
        };
        this.sort = {
            field: sortField,
            dir: "asc"
        };
        $.extend(this, options || {});
    };
    
    DataSourceConfig.prototype = {
        type: "odata",
        schema: {
            data: _wcfSchemaData,
            total: _wcfSchemaTotal
        },
        requestStart: function () { if (this.pageSize() === undefined || this.page() === 1) { utils.showLoading(); }}, //infinite scrolling has its own, less obtrusive indicator
        requestEnd: function () { utils.hideLoading(); },
        error: function () { utils.hideLoading(); utils.showError("There was an error loading the data from the server. Please close the app and try again."); }
    };

    var EndlessScrollDataSource = kendo.data.DataSource.extend({
        _observe: function(data) {
            if(this._page > 1) {
                this._data.push.apply(this._data, data);
                return this._data;
            }
            return kendo.data.DataSource.prototype._observe.call(this, data);
        }
    });

    return {
        clear: function (dataSource) {
            dataSource.view().splice(0, dataSource.view().length);
        },
        
        genresList: new kendo.data.DataSource(new DataSourceConfig(config.genresUrl, "Name")),
        
        beers: new kendo.data.DataSource({
                transport: {
                        read: "http://adapptalo.com/BBF/beers.json"
                },
                group: [{field: "FirstLetter"}],
                schema: {
                        parse: function (data) {
                                $.each(data, function (index, artist2) {
                                        artist2.FirstLetter = artist2.CERVESERA.substring(0,1).toUpperCase();
                                        if(artist2.FirstLetter.match(/\d/)) {
                                                artist2.FirstLetter = "#"
                                        }
                                });
                                return data;
                        }
                }
        }),
        beersD2: new kendo.data.DataSource({
                data: [{"ArtistId":1,"Name":"65daysofstatic"},{"ArtistId":2,"Name":"Aaron Copland & London Symphony Orchestra"},{"ArtistId":4,"Name":"Above & Beyond"},{"ArtistId":5,"Name":"Above the Fold"},{"ArtistId":8,"Name":"Adicts"},{"ArtistId":11,"Name":"Aisha Duo"},{"ArtistId":12,"Name":"Al di Meola"},{"ArtistId":14,"Name":"Alanis Morissette"},{"ArtistId":16,"Name":"Alice in Chains"},{"ArtistId":17,"Name":"Alison Krauss"},{"ArtistId":18,"Name":"Amon Amarth"},{"ArtistId":19,"Name":"Amon Tobin"},{"ArtistId":20,"Name":"Amr Diab"},{"ArtistId":23,"Name":"Anthrax"},{"ArtistId":28,"Name":"Arcade Fire"},{"ArtistId":30,"Name":"Bad Religion"},{"ArtistId":31,"Name":"Barenaked Ladies"},{"ArtistId":33,"Name":"Bee Gees"},{"ArtistId":34,"Name":"Before the Dawn"},{"ArtistId":40,"Name":"BL\u00d8F"},{"ArtistId":41,"Name":"Blues Traveler"},{"ArtistId":46,"Name":"Burial"},{"ArtistId":47,"Name":"Butch Walker & The Black Widows"},{"ArtistId":49,"Name":"Cake"},{"ArtistId":51,"Name":"Carly Rae Jepsen"},{"ArtistId":52,"Name":"Carreras, Pavarotti, Domingo"},{"ArtistId":54,"Name":"Cayouche"},{"ArtistId":56,"Name":"Chicago "},{"ArtistId":65,"Name":"Coldplay"},{"ArtistId":67,"Name":"Crosby, Stills, Nash, and Young"},{"ArtistId":68,"Name":"Daft Punk"},{"ArtistId":69,"Name":"Danielson Famile"},{"ArtistId":70,"Name":"David Bowie"},{"ArtistId":72,"Name":"David Guetta"},{"ArtistId":75,"Name":"Def Leppard"},{"ArtistId":76,"Name":"Deftones"},{"ArtistId":78,"Name":"Deva Premal"},{"ArtistId":79,"Name":"Dio"},{"ArtistId":81,"Name":"Dolly Parton"},{"ArtistId":83,"Name":"Dr. Dre"},{"ArtistId":85,"Name":"Dream Theater"},{"ArtistId":86,"Name":"Duck Sauce"},{"ArtistId":87,"Name":"Earl Scruggs"},{"ArtistId":91,"Name":"Eminem"},{"ArtistId":93,"Name":"Enya"},{"ArtistId":94,"Name":"Epica"},{"ArtistId":95,"Name":"Eric B. and Rakim"},{"ArtistId":100,"Name":"Filter"},{"ArtistId":102,"Name":"Four Tet"},{"ArtistId":106,"Name":"Garbage"},{"ArtistId":112,"Name":"Guns N' Roses"},{"ArtistId":114,"Name":"In This Moment"},{"ArtistId":116,"Name":"INXS"},{"ArtistId":117,"Name":"Iron Maiden"},{"ArtistId":118,"Name":"Jagjit Singh"},{"ArtistId":122,"Name":"Jimmy Buffett"},{"ArtistId":123,"Name":"Jimmy Smith"},{"ArtistId":125,"Name":"John Digweed"},{"ArtistId":126,"Name":"John Mayer"},{"ArtistId":129,"Name":"Journey"},{"ArtistId":132,"Name":"Justice"},{"ArtistId":134,"Name":"King Crimson"},{"ArtistId":136,"Name":"LCD Soundsystem"},{"ArtistId":137,"Name":"Le Tigre"},{"ArtistId":138,"Name":"Led Zeppelin"},{"ArtistId":142,"Name":"Limp Bizkit"},{"ArtistId":143,"Name":"Linkin Park"},{"ArtistId":144,"Name":"Live"},{"ArtistId":145,"Name":"Lokua Kanza"},{"ArtistId":147,"Name":"Los Tigres del Norte"},{"ArtistId":150,"Name":"Lura"},{"ArtistId":154,"Name":"Mark Knopfler"},{"ArtistId":156,"Name":"Massive Attack"},{"ArtistId":158,"Name":"Megadeth"},{"ArtistId":160,"Name":"Melanie Fiona"},{"ArtistId":162,"Name":"Metallica"},{"ArtistId":163,"Name":"M-Flo"},{"ArtistId":164,"Name":"Michael Bolton"},{"ArtistId":166,"Name":"Miles Davis"},{"ArtistId":168,"Name":"Mobile"},{"ArtistId":169,"Name":"Modest Mouse"},{"ArtistId":172,"Name":"Mumford & Sons"},{"ArtistId":173,"Name":"Munkle"},{"ArtistId":176,"Name":"New York Dolls"},{"ArtistId":177,"Name":"Nick Cave and the Bad Seeds"},{"ArtistId":179,"Name":"Nine Inch Nails"},{"ArtistId":180,"Name":"Nirvana"},{"ArtistId":181,"Name":"Norah Jones"},{"ArtistId":182,"Name":"Nujabes"},{"ArtistId":184,"Name":"Oasis"},{"ArtistId":186,"Name":"Opeth"},{"ArtistId":189,"Name":"Ozzy Osbourne"},{"ArtistId":190,"Name":"Paddy Casey"},{"ArtistId":192,"Name":"Papa Wemba"},{"ArtistId":194,"Name":"Paul Oakenfold"},{"ArtistId":195,"Name":"Paul Van Dyk"},{"ArtistId":196,"Name":"Pearl Jam"},{"ArtistId":197,"Name":"Pet Shop Boys"},{"ArtistId":198,"Name":"Pink Floyd"},{"ArtistId":199,"Name":"Plug"},{"ArtistId":200,"Name":"Porcupine Tree"},{"ArtistId":201,"Name":"Portishead"},{"ArtistId":202,"Name":"Prince"},{"ArtistId":203,"Name":"Projected"},{"ArtistId":204,"Name":"PSY"},{"ArtistId":205,"Name":"Public Enemy"},{"ArtistId":206,"Name":"Queen"},{"ArtistId":207,"Name":"Queensr\u00ffche"},{"ArtistId":208,"Name":"R.E.M."},{"ArtistId":209,"Name":"Radiohead"},{"ArtistId":210,"Name":"Rancid"},{"ArtistId":212,"Name":"Raunchy"},{"ArtistId":214,"Name":"Rick Ross"},{"ArtistId":215,"Name":"Robert James"},{"ArtistId":218,"Name":"Run DMC"},{"ArtistId":219,"Name":"Rush"},{"ArtistId":221,"Name":"Sara Tavares"},{"ArtistId":222,"Name":"Sarah Brightman"},{"ArtistId":227,"Name":"Sheryl Crow"},{"ArtistId":230,"Name":"Skrillex"},{"ArtistId":232,"Name":"Slayer"},{"ArtistId":237,"Name":"Stevie Ray Vaughan"},{"ArtistId":238,"Name":"Sting"},{"ArtistId":239,"Name":"Stone Temple Pilots"},{"ArtistId":240,"Name":"Styx"},{"ArtistId":241,"Name":"Sufjan Stevens"},{"ArtistId":244,"Name":"T&N"},{"ArtistId":245,"Name":"Talking Heads"},{"ArtistId":246,"Name":"Tears For Fears"},{"ArtistId":247,"Name":"Ted Nugent"},{"ArtistId":252,"Name":"The Beatles"},{"ArtistId":253,"Name":"The Black Crowes"},{"ArtistId":254,"Name":"The Black Keys"},{"ArtistId":255,"Name":"The Carpenters"},{"ArtistId":256,"Name":"The Cat Empire"},{"ArtistId":258,"Name":"The Cure"},{"ArtistId":259,"Name":"The Decemberists"},{"ArtistId":261,"Name":"The Eagles of Death Metal"},{"ArtistId":262,"Name":"The Go! Team"},{"ArtistId":263,"Name":"The Head and the Heart"},{"ArtistId":264,"Name":"The Jezabels"},{"ArtistId":266,"Name":"The Lumineers"},{"ArtistId":267,"Name":"The Offspring"},{"ArtistId":270,"Name":"The Prodigy"},{"ArtistId":272,"Name":"The Rubberbandits"},{"ArtistId":273,"Name":"The Smashing Pumpkins"},{"ArtistId":274,"Name":"The Stone Roses"},{"ArtistId":275,"Name":"The Who"},{"ArtistId":276,"Name":"Them Crooked Vultures"},{"ArtistId":277,"Name":"TheStart"},{"ArtistId":278,"Name":"Thievery Corporation"},{"ArtistId":279,"Name":"Ti\u00ebsto"},{"ArtistId":282,"Name":"Tool"},{"ArtistId":283,"Name":"Tori Amos"},{"ArtistId":284,"Name":"Trampled By Turtles"},{"ArtistId":285,"Name":"Trans-Siberian Orchestra"},{"ArtistId":286,"Name":"Tygers of Pan Tang"},{"ArtistId":287,"Name":"U2"},{"ArtistId":289,"Name":"Uh Huh Her "},{"ArtistId":290,"Name":"Van Halen"},{"ArtistId":293,"Name":"Venus Hum"},{"ArtistId":294,"Name":"Vicente Fernandez"},{"ArtistId":296,"Name":"Weezer"},{"ArtistId":297,"Name":"Weird Al"},{"ArtistId":298,"Name":"Wendy Carlos"},{"ArtistId":300,"Name":"Yano"},{"ArtistId":302,"Name":"Yes"},{"ArtistId":305,"Name":"\u05d0\u05e8\u05d9\u05e7 \u05d0\u05d9\u05e0\u05e9\u05d8\u05d9\u05d9\u05df"}],
                serverFiltering: true,
                serverSorting: true,
                serverGrouping: false,
                group: [{field: "FirstLetter"}],
                schema: {
                    parse: function (data) {
                        $.each(data.value, function (index, artist3) {
                            artist3.FirstLetter = artist3.CERVESERA.substring(0,1).toUpperCase();
                            if(artist3.FirstLetter.match(/\d/)) {
                                artist3.FirstLetter = "#"
                            }
                        });
                        return data;
                    },
                    data: _wcfSchemaData,
                    total: _wcfSchemaTotal
                }
        }),
        beersList: new kendo.data.DataSource(new DataSourceConfig(config.beersUrl2, "CERVESERA", {
            serverFiltering: true,
            serverSorting: true,
            serverGrouping: false,
            group: [{field: "FirstLetter"}],
            schema: {
                parse: function (data) {
                    $.each(data.value, function (index, artist3) {
                        artist3.FirstLetter = artist3.CERVESERA.substring(0,1).toUpperCase();
                        if(artist3.FirstLetter.match(/\d/)) {
                            artist3.FirstLetter = "#"
                        }
                    });
                    return data;
                },
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        })),
        
        artistsList: new kendo.data.DataSource(new DataSourceConfig(config.artistsUrl, "Name", {
            serverFiltering: true,
            serverSorting: true,
            serverGrouping: false,
            group: [{field: "FirstLetter"}],
            schema: {
                parse: function (data) {
                    $.each(data.value, function (index, artist) {
                        artist.FirstLetter = artist.Name.substring(0,1).toUpperCase();
                        if(artist.FirstLetter.match(/\d/)) {
                            artist.FirstLetter = "#"
                        }
                    });
                    return data;
                },
                data: _wcfSchemaData,
                total: _wcfSchemaTotal
            }
        })),

        albumsList: new EndlessScrollDataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title", {
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 20
        })),

        searchList: new EndlessScrollDataSource(new DataSourceConfig(config.albumsUrl + "?$expand=Artist", "Title", {
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 20
        })),

        orderHistory: function (user, pass) {
            return new kendo.data.DataSource({
                serverPaging: true,
                serverSorting: true,
                pageSize: 5,
                sort: [{field: "OrderDate", dir: "desc"}, {field: "Title", dir: "asc"}],
                group: {field: "OrderId"},
                transport: {
                    read: {
                        url: config.orderHistoryUrl,
                        type: "POST",
                        data: {
                            username: user,
                            password: pass
                        }
                    }
                },
                schema: {
                    data: "Data",
                    total: "Total",
                    model: {
                        id: "OrderId",
                        fields: {
                            OrderId: { type: "number" },
                            OrderDate: { type: "date" },
                            Quantity: { type: "number" },
                            UnitPrice: { type: "number" },
                            Title: { type: "string"}
                        }
                    }
                },
                requestStart: function () { if (this.page() === 1) { utils.showLoading(); }},
                requestEnd: function () { if (this.page() === 1) { utils.hideLoading(); }},
                error: function () { utils.hideLoading(); utils.showError("There was an error loading the data from the server. Please close the app and try again."); }
            });
        }
    };
});