const router = require('express').Router();
const Budget = require('./budget.js');

const userErr = (status, message, res) => {
    res.status(status).json({error: message});
    return;
};
router.route('/').post(post).get(get)

function post (req, res){
    const budgetDb = req.body
    const {title, budgetAmount} = req.body
    const newBudget = new Budget(budgetDb)
    if (!title){
        userErr(400, "Please supply a title!", res)
    } else {
        newBudget
            .save()
            .then(savedBudget => {
                res.status(201).json({savedBudget})
            })
            .catch(err => {
                userErr(500, err.message, res)
            })
    }
}
function get (req, res){
    Budget.find()
        .select('-__v -_id')
        .then(budget => {
            res.status(200).json({budget})
        })
        .catch(err => userErr(500, err.message, res))
}
// router
//     .route('/:id')
//     .delete((req, res) => {
//         const {id} = req.params;
//         console.log(id);
//         if ()
//     })
module.exports = router;