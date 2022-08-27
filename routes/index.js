var express = require('express');
var router = express.Router();

// req = request
// res = response

/* GET home page. */
router.get('/', function(req, res, next) {
  /*headers, body*/
  // res.status(404).json()
  // res.render('index', { title: 'Express' });
  /*Va a generar un json porque trabajamos con json*/
  // res.json({
  //   "paging":{
  //     "total":1,
  //     "almost":4
  //   }
  // }); 
  res.json([])
});

router.get('/:id', function(req, res, next){

  if (req.params.id == 123){
    res.status(404).json()
    return
  }

  res.json({
    id:req.params.id
  })
})

module.exports = router;
