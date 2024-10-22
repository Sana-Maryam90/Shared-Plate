import { NextResponse } from 'next/server';
import GiveRequest from '@/models/giveRequest';
import Taker from '@/models/taker'; // Import the Taker model
import { connectDb } from '@/helper/db';

export async function POST(request) {
    try {
      await connectDb();

      // Extract the userId from the request parameters
      const { userId } = await request.json();

      // Find all closed requests where the user acted as a giver
      const closedGiveRequest = await GiveRequest.find({
        giverId: userId,
        status: "closed",
      });

      // Find all closed requests where the user acted as a taker (volunteer)
      const closedTakeRequests = await GiveRequest.find({
        volunteerId: userId,
        status: "closed",
      });

      // Find ongoing requests for the user as a giver
      const ongoingGiveRequest = await GiveRequest.find({
        giverId: userId,
        status: "ongoing",
      });

      // Find ongoing requests for the user as a taker (volunteer)
      const ongoingTakeRequests = await GiveRequest.find({
        volunteerId: userId,
        status: "ongoing",
      });

      // // Find open requests where the user is a giver (whether requested or not)
      const openGiveRequest = await GiveRequest.find({
        giverId: userId,
        status: "open",
      });

      // Extract user IDs from requestedBy field in open requests
      const userIds = openGiveRequest.reduce((acc, curr) => {
        if (curr.requestedBy) {
          acc.push(...curr.requestedBy);
        }
        return acc;
      }, []);

      // Find Takers based on user IDs from requestedBy field
      const takersRequesting = await Taker.find({ userId: { $in: userIds } });

      // Attach taker information to openGiveRequests, ongoingGiveRequest if requestedBy exists
      const openGiveRequests = openGiveRequest.map((req) => {
        if (req.requestedBy) {
          return {
            ...req._doc,
            takersRequesting: takersRequesting.filter((taker) =>
              req.requestedBy.includes(taker.userId)
            ),
          };
        } else {
          return req;
        }
      });

      // Find open requests where the user has requested to take (openTakeRequest)
      const openTakeRequests = await GiveRequest.find({
        requestedBy: userId,
        status: "open",
      });

      const ongoingGiveRequests = await Promise.all(
        ongoingGiveRequest.map(async (req) => {
          if (req.volunteerId) {
            try {
              // Find volunteer info by matching the userId in the Taker table
              const volunteerInfo = await Taker.find({
                userId: req.volunteerId,
              });

              // Return the request with the added volunteer info
              return {
                ...req._doc, // Spread the Mongoose document fields
                volunteerInfo: volunteerInfo, // Add the volunteer info array
              };
            } catch (error) {
              console.error(
                `Error fetching volunteer info for request ${req._id}:`,
                error
              );
              return req; // Return the original request if error occurs
            }
          } else {
            return req; // Return the original request if no volunteerId exists
          }
        })
      );
      const closedGiveRequests = await Promise.all(
        closedGiveRequest.map(async (req) => {
          if (req.volunteerId) {
            try {
              // Find volunteer info by matching the userId in the Taker table
              const volunteerInfo = await Taker.find({
                userId: req.volunteerId,
              });

              // Return the request with the added volunteer info
              return {
                ...req._doc, // Spread the Mongoose document fields
                volunteerInfo: volunteerInfo, // Add the volunteer info array
              };
            } catch (error) {
              console.error(
                `Error fetching volunteer info for request ${req._id}:`,
                error
              );
              return req; // Return the original request if error occurs
            }
          } else {
            return req; // Return the original request if no volunteerId exists
          }
        })
      );

      // Return the requests in the response
      return NextResponse.json(
        {
          closedGiveRequests,
          closedTakeRequests,
          ongoingGiveRequests,
          ongoingTakeRequests,
          openGiveRequests,
          openTakeRequests,
        },
        { status: 200 }
      );
    } catch (error) {
        console.error('Error fetching user requests:', error.message);
        // Handle errors and return appropriate response
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}













// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import Taker from '@/models/taker'; // Import the Taker model
// import { connectDb } from '@/helper/db';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Extract the userId from the request parameters
//         const { userId } = await request.json();

//         // Find all closed requests where the user acted as a giver
//         const giverRequests = await GiveRequest.find({
//             giverId: userId,
//             status: 'closed'
//         });

//         // Find all closed requests where the user acted as a taker (volunteer)
//         const takerRequests = await GiveRequest.find({
//             volunteerId: userId,
//             status: 'closed'
//         });

//         // Find ongoing requests for the user as a giver or taker
//         const ongoingRequests = await GiveRequest.find({
//             $or: [
//                 { giverId: userId, status: 'ongoing' },
//                 { volunteerId: userId, status: 'ongoing' }
//             ]
//         });

//         // Find open requests with requestedBy field
//         const openRequestedBy = await GiveRequest.find({
//             giverId: userId,
//             status: 'open',
//             requestedBy: { $exists: true } // Ensure requestedBy field exists
//         });

//         // Extract user IDs from requestedBy field in open requests
//         const userIds = openRequestedBy.reduce((acc, curr) => {
//             acc.push(...curr.requestedBy);
//             return acc;
//         }, []);

//         // Find Takers based on user IDs from requestedBy field
//         const takersRequesting = await Taker.find({ userId: { $in: userIds } });

//         // Find open requests not requested by anyone
//         const openRequestsNotRequested = await GiveRequest.find({
//             giverId: userId,
//             status: 'open',
//             requestedBy: { $exists: false } // Ensure requestedBy field doesn't exist
//         });

//         // Return the requests in the response
//         return NextResponse.json({ giverRequests, takerRequests, ongoingRequests, takersRequesting, openRequestsNotRequested }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching user requests:', error.message);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }











// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import Taker from '@/models/taker'; // Import the Taker model
// import { connectDb } from '@/helper/db';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Extract the userId from the request parameters
//         const { userId } = await request.json();

//         // Find all closed requests where the user acted as a giver
//         const giverRequests = await GiveRequest.find({
//             giverId: userId,
//             status: 'closed'
//         });

//         // Find all closed requests where the user acted as a taker (volunteer)
//         const takerRequests = await GiveRequest.find({
//             volunteerId: userId,
//             status: 'closed'
//         });

//         // Find ongoing requests for the user as a giver or taker
//         const ongoingRequests = await GiveRequest.find({
//             $or: [
//                 { giverId: userId, status: 'ongoing' },
//                 { volunteerId: userId, status: 'ongoing' }
//             ]
//         });

//         // Find open requests with requestedBy field
//         const openRequestedBy = await GiveRequest.find({
//             status: 'open',
//             requestedBy: { $exists: true } // Ensure requestedBy field exists and is not empty
//         });

//         // Extract user IDs from requestedBy field in open requests
//         const userIds = openRequestedBy.reduce((acc, curr) => {
//             acc.push(...curr.requestedBy);
//             return acc;
//         }, []);

//         // Find Takers based on user IDs from requestedBy field
//         const takersRequesting = await Taker.find({ userId: { $in: userIds } });

//         // Return the requests in the response
//         return NextResponse.json({ giverRequests, takerRequests, ongoingRequests, takersRequesting }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching user requests:', error.message);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }


// import { NextResponse } from 'next/server';
// import GiveRequest from '@/models/giveRequest';
// import { connectDb } from '@/helper/db';

// export async function POST(request) {
//     try {
//         await connectDb();

//         // Extract the userId from the request body
//         const { userId } = await request.json();

//         // Find all closed requests where the user acted as a giver
//         const giverRequests = await GiveRequest.find({
//             giverId: userId,
//             status: 'closed'
//         });

//         // Find all closed requests where the user acted as a taker (volunteer)
//         const takerRequests = await GiveRequest.find({
//             volunteerId: userId,
//             status: 'closed'
//         });

//         // Find ongoing requests for the user as a giver or taker
//         const ongoingRequests = await GiveRequest.find({
//             $or: [
//                 { giverId: userId, status: 'ongoing' },
//                 { volunteerId: userId, status: 'ongoing' }
//             ]
//         });

//         // Return the requests in the response
//         return NextResponse.json({ giverRequests, takerRequests, ongoingRequests }, { status: 200 });
//     } catch (error) {
//         console.error('Error fetching user requests:', error.message);
//         // Handle errors and return appropriate response
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }
