const {supabase} = require('../client.js')


exports.addTaskController = async (req, res) => {
const task = req.body
    
    try{
        
        const {data, error} = await supabase.from('tasks').insert(
            [task]
        ).select()
        console.log(data)
        if(error){
            throw error
        }
        return res.status(200).json(data)

    }
    catch(error){
        console.log("Supabase Database Insert Error ",error.message)
        return res.status(500).json({error: 'Internal Server Error'})
    }
    
}

exports.fetchTasksController = async (req, res) => {
    
    try{
        const {data, error} = await supabase.from('tasks').select('*')
        console.log(error)
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}