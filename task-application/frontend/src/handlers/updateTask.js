
export const updateTask = async (taskId) => {
  try {
    const data = await fetch(
      `http://localhost:3000/api/get-tasks/update/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(data);
  } catch (err) {
    console.log("error: ", err.message);
  }
};
