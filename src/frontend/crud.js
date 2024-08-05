export async function createProfile(username, password) {
    const response = await fetch(`/profile/create?username=${username}&password=${password}`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
}

export async function readProfile(username) {
    const response = await fetch(`/profile/read?username=${username}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
}

export async function updateProfile(username, password) {
    const response = await fetch(`/profile/update?username=${username}&password=${password}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
}

export async function deleteProfile(username) {
    const response = await fetch(`/profile/delete?username=${username}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
}
