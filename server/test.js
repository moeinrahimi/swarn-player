const fs = require('fs')
const path = require('path')
const folders = ["F:/music/Ellie Goulding","F:/music/Eminem - Revival [Album] [iTunes Version] - [7tunes]"]
const songs = [
  {
    "title": "End Game (feat. Ed Sheeran &amp; Future)",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 2,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/02 End Game (feat. Ed Sheeran &amp; Futu.m4a",
    "id": "WW6j2PuC6Ds9HX12D2rHN",
    "artwork": "End Game (feat. Ed Sheeran &amp; Future).jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "I Did Something Bad",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "ab",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 3,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/03 I Did Something Bad.m4a",
    "id": "eBIvZHCGfK~6MwMT7HzTZ",
    "artwork": "I Did Something Bad.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "Don&#8217;t Blame Me",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 4,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/04 Don_t Blame Me.m4a",
    "id": "QnBwqnjxYZx~tlzKQtdBi",
    "artwork": "Don&#8217;t Blame Me.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "Delicate",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 5,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/05 Delicate.m4a",
    "id": "cywV~0JCGjMwk04IRxk69",
    "artwork": "Delicate.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "Look What You Made Me Do",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-08-25T07:00:00Z",
    "track": {
      "no": 6,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 1,
      "of": 1
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/06 Look What You Made Me Do.m4a",
    "id": "nB3TxJQWmHS8Oic0MHssA",
    "artwork": "Look What You Made Me Do.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "So It Goes...",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 7,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/07 So It Goes....m4a",
    "id": "_5cvBv~kADLCMrxRTkCLt",
    "artwork": "So It Goes....jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "Gorgeous",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 8,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/08 Gorgeous.m4a",
    "id": "6dyDk9aid6XzYmlkyKu9o",
    "artwork": "Gorgeous.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  {
    "title": "Getaway Car",
    "artist": [
      "Taylor Swift"
    ],
    "albumartist": [
      "Taylor Swift"
    ],
    "album": "reputation",
    "year": "2017-11-10T08:00:00Z",
    "track": {
      "no": 9,
      "of": 15
    },
    "genre": [
      "Pop"
    ],
    "disk": {
      "no": 0,
      "of": 0
    },
    "duration": 0,
    "fullPath": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]/09 Getaway Car.m4a",
    "id": "2gesMkdmYmViB968sIQ6y",
    "artwork": "Getaway Car.jpg",
    "color": {
      "Vibrant": null,
      "LightVibrant": null,
      "DarkVibrant": null,
      "Muted": {
        "_rgb": [
          124,
          124,
          124
        ],
        "_population": 86,
        "_hsl": [
          0,
          0,
          0.48627450980392156
        ]
      },
      "LightMuted": {
        "_rgb": [
          188,
          188,
          188
        ],
        "_population": 143,
        "_hsl": [
          0,
          0,
          0.7372549019607844
        ]
      },
      "DarkMuted": {
        "_rgb": [
          68,
          68,
          68
        ],
        "_population": 55,
        "_hsl": [
          0,
          0,
          0.26666666666666666
        ]
      }
    },
    "dirName": "Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "baseDir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "dir": "I:/music/stranger things/011/Taylor Swift - Reputation [Album] [iTunes Version] - [7tunes]",
    "isDir": true
  },
  
]
function compare(a,b) {
  if (a.album < b.album)
    return -1;
  if (a.album > b.album)
    return 1;
  return 0;
}

songs.sort(compare);
console.log(songs)
// const a =  ( async ()=>{
  
// })
// a()

