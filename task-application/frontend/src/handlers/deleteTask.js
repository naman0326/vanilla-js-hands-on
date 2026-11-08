
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-tasks/delete/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      console.log("Error Deleting task!");
    }
  } catch (err) {
    console.log(err.message);
  }
};
