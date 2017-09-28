// it might be said:
// node modules
var express = require('express')
//my modules:
var aboutFunc = require('./lib/aboutArr.js')

var app = express()

// Handlebars view engine
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    }
  }
})

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)
// it might be said:
app.use(require('body-parser')())

app.get('/thank-you', (req, res) => {
  res.render('thank-you')
})

app.get('/newsletter', (req, res) => {
  res.render('newsletter', {
    csrf: 'CSRF token goes here'
  })
})

// it might be said:
app.post('/process', (req, res) => {
  if (req.xhr || req.accepts('json, html') === 'json') {
    res.send({
      success: true
    })
  } else {
    res.redirect(303, '/thank-you')
  }
})
// app.post('/process', (req, res) => {
//   console.log('Form (from querystring): ' + req.query.form)
//   console.log('CSRF token (from hidden form field): ' + req.body._csrf)
//   console.log('Name (from visible form field):' + req.body.name)
//   console.log('Email (from visible form field):' + req.body.email)
//   res.redirect(303, '/thank-you')
// })

app.use(express.static(__dirname + '/public'))

// testing initiliazation
app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
  next()
})

// it might be said:
function getLocationData() {
  return {
    locations: [{
        name: 'Harrow',
        someUrl: 'http://www.bbc.co.uk',
        someIcon: 'http://via.placeholder.com/350x150/ff00aa',
        population: 'some pop',
        where: 'in London'
      },
      {
        name: 'Ealing',
        someUrl: 'http://www.bbc.co.uk',
        someIcon: 'http://via.placeholder.com/350x150/feefee',
        population: 'some pop',
        where: 'in London'
      },
      {
        name: 'Richmond',
        someUrl: 'http://www.bbc.co.uk',
        someIcon: 'http://via.placeholder.com/350x150/000',
        population: 'some pop',
        where: 'in London'
      },
    ],
  };
}

app.use(function(req, res, next) {
  if (!res.locals.partials) {
    res.locals.partials = {}
  }
  res.locals.partials.areas = getLocationData()
  next()
})


app.get('/headers', (req, res) => {
  res.set('Content-Type', 'text/plain')
  var s = ''
  for (var name in req.headers) {
    s += name + ': ' + req.headers[name] + '/n'
    res.send(s)
  }
})


app.get('/', (req, res) => {
  res.render('home')
})


app.get('/nursery-rhyme', (req, res) => {
  res.render('nursery-rhyme')
})

// it might be said:
app.get('/data/nursery-rhyme', (req, res) => {
  res.json({
    animal: 'squirrel',
    bodyPart: 'tail',
    adjective: 'bushy',
    noun: 'noun'
  })
})

app.get('/jquery-test', (req, res) => {
  res.render('jquery-test')
})

app.get('/about', (req, res) => {
  res.render('about', {
    aboutArrOutput: aboutFunc.getArray(),
    pageTestScript: '/qa/tests-about.js'
  })
})
// it might be said:
app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river')
})

app.get('/tours/oregon-coast', (req, res) => {
  res.render('tours/oregon-coast')
})

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate')
})

app.use((req, res, next) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), () => {
  console.log('Express started on...' + app.get('port') + '; press Ctr-c to terminate');
})
