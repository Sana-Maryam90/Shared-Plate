import React from 'react'

export const GiveCard = ({label, icon, data}) => {
    return (
      <div className="flex flex-col mx-3 py-2 lg:w-1/2 ">
        <div className="flex justify-start items-center gap-16 mb-2">
          <h1 className="font-notosans text-lg font-bold text-black/80">
            {label}
          </h1>
          {icon && (
            <div className="text-lg">{React.cloneElement(icon)}</div>
          )}
        </div>
        <p className="font-notosans text-lg text-left">{data}</p>
      </div>
    );
}

// const PersonalCard = () => {
//   return (
//     <div>
//       {user ? (
//         <>
//           <p className="font-semibold">{user.name}</p> {/* Username */}
//           <p className="text-sm text-gray-500">{user.email}</p>{" "}
//         </>
//       ) : (
//         <div className="flex justify-center items-center">
//           {/* Circular Loader */}
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
//         </div>
//       )}
//     </div>
//   );
// }

  
// export default PersonalCard


