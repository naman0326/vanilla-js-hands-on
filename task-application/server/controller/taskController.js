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
    catch(err){
        console.log("Supabase Database Insert Error ",err.message)
        return res.status(500).json({success: false, error: err.message})
    }
    
}

exports.deleteTaskController = async (req, res) => {
    const id = req.params.id
    try{
        const {data, error} = await supabase.from('tasks')
        .delete().eq('id', id)

        if(error){
            throw error
        }
        return res.status(200).json(data)
    }catch(err){
        console.log('Supabase Deletion error', err.message)

        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.updateTaskStatus = async (req, res) => {
    try{
        const id = req.params.id 
        const {data, error} = await supabase.from('tasks').update({is_completed: true}).eq('id', id)
        if(error){
            throw error
        }
        return res.status(200).json(data)
    }catch(err){
        console.log("Error: ", err.message)
        return res.status(500).json({success: false, error: err.message})
    }
}



exports.fetchTasksController = async (req, res) => {
    
    try{
        const {data, error} = await supabase.from('tasks').select('*')
        console.log(error)
        return res.status(200).json(data)
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({success: false, error: err.message})
    }
}