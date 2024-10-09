export default function UserProfile({params}:any){
  return (
    <>
    <div>
      <p>Profile page</p>
    </div>
    
    <div>{params.id}</div>
    </>
  )
}