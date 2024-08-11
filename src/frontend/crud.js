export async function createProfile(username, password) {
    const response = await fetch(`http://localhost:3000/profile/create?username=${username}&password=${password}`, {
        method: 'POST',
      });
      return response;
}

export async function readProfile(username) {
    const response = await fetch(`http://localhost:3000/profile/read?username=${username}`, {
        method: 'GET',
      });
      return response;
}

export async function updateProfile(username, password) {
    const response = await fetch(`http://localhost:3000/profile/update?username=${username}&password=${password}`, {
        method: 'PUT',
      });
      return response;
}

export async function deleteProfile(username) {
    const response = await fetch(`http://localhost:3000/profile/delete?username=${username}`, {
        method: 'DELETE',
      });
      return response;
}
