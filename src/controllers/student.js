const Student = require('../models/Student')


exports.createResult = async (req, res) => {
    try {
        const {roleNo,name, accountancy, english, math, economics, businessStudies} = req.body;
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            })
        }

        if (!roleNo) {
            return res.status(400).json({
                error: 'Role number is required'
            })
        }
        if (!english) {
            return res.status(400).json({
                error: 'English is required'
            })
        }
        if (!math) {
            return res.status(400).json({
                error: 'Math is required'
            })
        }

        if (!accountancy) {
            return res.status(400).json({
                error: 'Accountancy is required'
            })
        }


        if (!economics) {
            return res.status(400).json({
                error: 'Economics is required'
            })
        }
        if (!businessStudies) {
            return res.status(400).json({
                error: 'Business Study is required'
            })
        }

        const isStudent = await Student.findOne({roleNo});

        if (isStudent) {
            return res.status(400).json({
                error: 'Role number already exits'
            })
        }

        const student = new Student({roleNo,name, accountancy, english, math, economics, businessStudies});
        await student.save();

        res.status(200).json(student);

    }catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.getResults = async (req, res)=>{
    try {
        const {keyword} = req.params;


       const result = {$addFields: {result: {
                   $cond: {if: {$gt: [{$size: {
                                   $filter: {
                                       input: ['$accountancy', '$english', '$math', '$economics', "$businessStudies"],
                                       as: "item",
                                       cond: { $lte: [ "$$item", 32 ] }
                                   }
                               }} , 0]}, then: 'Failed', else: 'Passed'}
               }}}

        let students;
        if (keyword !== '0'){
            const searchRegx = {"$regex": keyword, "$options": "i"};
            const searchQuery = {$or: [ {name: searchRegx},{roleNo: searchRegx} ]};
            students = await Student.aggregate([
                {$match: searchQuery},
                {$facet: {
                        'total': [ {$count: 'count'} ],
                        'rows': [
                            {$addFields: {total: {$sum: ['$accountancy', '$english', '$math', '$economics', "$businessStudies"]}}},
                            {$addFields: {key: '$roleNo'}},
                            {$addFields: {average: {
                                        $round: {
                                            $avg: ['$accountancy', '$english', '$math', '$economics', "$businessStudies"]}
                                    }
                            }},
                            result,
                            /*{ $skip: skipPage }, {$limit: perPage}*/
                        ],
                    }
                }
            ])
        }else {
            students = await Student.aggregate([
                {$facet: {
                        'total': [ {$count: 'count'}],
                        'rows': [
                            {$addFields: {total: {$sum: ['$accountancy', '$english', '$math', '$economics', "$businessStudies"]}}},
                            {$addFields: {key: '$roleNo'}},
                            {$addFields: {average: {
                                $round: {
                                    $avg: ['$accountancy', '$english', '$math', '$economics', "$businessStudies"]}
                                }
                            }},
                            result,
                            /*{ $skip: skipPage }, {$limit: perPage}*/
                        ]
                    }}
            ])
        }

        res.status(200).json(students);

    }catch (e) {
        res.json({error: e.message})
    }
}

exports.editResult = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        res.status(200).json(student);

    }catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.updateStudent = async (req, res) => {
    try {

        const id = req.params.id;

        const isStudent = await Student.findById(id);
        if (!isStudent){
           return res.status(404).json({
                error: 'Not found'
            })
        }

        const data = {
            name: req.body.name !== '' ? req.body.name : isStudent.name,
            roleNo: isStudent.roleNo,
            accountancy: req.body.accountancy !== null ? req.body.accountancy : isStudent.accountancy,
            english: req.body.english !== null ? req.body.english : isStudent.english,
            math: req.body.math !== null ? req.body.math : isStudent.math,
            economics: req.body.economics !== null ? req.body.economics : isStudent.economics,
            businessStudies: req.body.businessStudies !== null ? req.body.businessStudies : isStudent.businessStudies
        };
        const student = await Student.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json(student);

    }catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}

exports.deleteStudent = async (req, res)=>{
    try {
        const id = req.params.id;
        const isStudent = await Student.findById(id);
        if (!isStudent){
            return res.status(404).json({
                error: 'Not found'
            })
        }

        const result = await Student.findByIdAndDelete(id);
        res.status(200).json(result);

    }catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Server error occurred'
        })
    }
}