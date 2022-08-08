import { useMutation, useQueryClient } from '@tanstack/react-query'

async function postUser() {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Jose Valenzuela',
      job: 'Magician'
    })
  });

  if(!response.ok) {
    throw new Error('Error while fetching users');
  }
  return response.json();
}


const UserForm = () => {

  const queryClient = useQueryClient();


  const mutation = useMutation(postUser, {
    onSettled: (data) => {
      console.log(data);
    },
    onSuccess: (response) => {
      console.log('success');
      // queryClient.invalidateQueries('users');
      queryClient.setQueryData(['users'], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, {
            id: response.id,
            name: response.name,
            job: response.job
          }]
        };
      } );
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleSubmit = () => {
    mutation.mutate();
  }

  return (
    <>
      <h2>User Form</h2>
      <button onClick={ handleSubmit }>Create user</button>
    </>
  )
}

export default UserForm