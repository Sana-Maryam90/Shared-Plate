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
      const closedTakeRequest = await GiveRequest.find({
        volunteerId: userId,
        status: "closed",
      });

      // Find ongoing requests for the user as a giver
      const ongoingGiveRequest = await GiveRequest.find({
        giverId: userId,
        status: "ongoing",
      });

      // Find ongoing requests for the user as a taker (volunteer)
      const ongoingTakeRequest = await GiveRequest.find({
        volunteerId: userId,
        status: "ongoing",
      });

      // // Find open requests where the user is a giver (whether requested or not)
      const openGiveRequests = await GiveRequest.find({
          giverId: userId,
          status: 'open'
      });

      // Extract user IDs from requestedBy field in open requests
      const userIds = openGiveRequests.reduce((acc, curr) => {
          if (curr.requestedBy) {
              acc.push(...curr.requestedBy);
          }
          return acc;
      }, []);

      // Find Takers based on user IDs from requestedBy field
      const takersRequesting = await Taker.find({ userId: { $in: userIds } });

      // Attach taker information to openGiveRequests if requestedBy exists
      const openGiveRequest = openGiveRequests.map(req => {
          if (req.requestedBy) {
              return {
                  ...req._doc,
                  takersRequesting: takersRequesting.filter(taker => req.requestedBy.includes(taker.userId))
              };
          } else {
              return req;
          }
      });

      // Find open requests where the user has requested to take (openTakeRequest)
      const openTakeRequest = await GiveRequest.find({
        requestedBy: userId,
        status: "open",
      });

      // Return the requests in the response
      return NextResponse.json(
        {
          closedGiveRequest,
          closedTakeRequest,
          ongoingGiveRequest,
          ongoingTakeRequest,
          openGiveRequest,
          openTakeRequest,
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
