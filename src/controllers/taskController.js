import Task from "../models/Task.js";


export const createATask = async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title) {

      return res.status(400).json({
        message: "Title is required",
      });

    }

    const task = new Task({
      title,
      description,
      owner: req.user._id,
    });

    await task.save();

    return res.status(201).json(task);

  } catch (error) {

    return res.status(500).json({
      message: "Server error",
    });

  }

}


// - Return all tasks belonging to req.user
export const getUserTasks = async (req, res) => {

  try {

    const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);

  } catch (error) {

    return res.status(500).json({
      message: "Server error",
    });

  }

}


export const deleteUserTask = async (req, res) => {
  
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this task",
      })
    }

    // delete task
    await task.deleteOne();

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    })
  }
}
