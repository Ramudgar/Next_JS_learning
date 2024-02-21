export default function UserProfilePage({params}:any){
    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
        <h1>Profile</h1>
          
        <p className="text-3xl">Profile Page
        <span className="text-4xl rounded  bg-orange-800  p-2 ml-2">{params.id}</span>
        </p>

        </div>
    )

}