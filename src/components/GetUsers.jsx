import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {

  const response = await fetch('https://reqres.in/api/users');
  if (!response.ok) {
    throw new Error('Error while fetching users');
  }
  return response.json();
}

export const GetUsers = () => {
  console.log('GetUsers');
  const { data, status } = useQuery(['users'], fetchUsers, {
    staleTime: 2000,
    cacheTime: 5000, // cacheTime will keep your data for 1 second and then eliminate it if not used
  });
  if (status === 'loading') {
    return <p>Loading products</p>;
  }
  if (status === 'error') {
    return <p>Error</p>;
  }
  return data.data.map(user => (
    <div key={user.id} className='mt-2'>
      <h2>{user.first_name}</h2>
      <img src={user.avatar}></img>
      <h2>{user.email}</h2>
      <h2>{user?.name}</h2>
      <h2>{user?.job}</h2>
    </div>
  ));
}