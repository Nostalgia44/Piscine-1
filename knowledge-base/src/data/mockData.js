// data/mockData.js

// Utilities for generating realistic data
const generateRandomDate = (start = new Date(2020, 0, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomSize = (min = 1024, max = 50 * 1024 * 1024) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Unique ID generator
let idCounter = 1;
const generateId = () => idCounter++;

// Main folders with complete hierarchy
export const folders = [
  {
    id: generateId(),
    name: "Documents",
    type: "folder",
    createdDate: generateRandomDate(new Date(2022, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 0, 1)),
    children: [
      {
        id: generateId(),
        name: "Work",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 0, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
        children: [
          {
            id: generateId(),
            name: "Projects 2024",
            type: "folder",
            createdDate: generateRandomDate(new Date(2024, 0, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
            children: [
              {
                id: generateId(),
                name: "Annual_Report_2024.pdf",
                type: "file",
                size: generateRandomSize(2 * 1024 * 1024, 15 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 0, 15)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 1))
              },
              {
                id: generateId(),
                name: "Q3_Budget.xlsx",
                type: "file",
                size: generateRandomSize(500 * 1024, 2 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 6, 1)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 15))
              },
              {
                id: generateId(),
                name: "Client_Presentation.pptx",
                type: "file",
                size: generateRandomSize(5 * 1024 * 1024, 25 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 5, 10)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 20))
              },
              {
                id: generateId(),
                name: "Marketing_Strategy.docx",
                type: "file",
                size: generateRandomSize(800 * 1024, 3 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 4, 5)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 10))
              }
            ]
          },
          {
            id: generateId(),
            name: "Contracts",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 6, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
            children: [
              {
                id: generateId(),
                name: "ABC_Company_Contract.pdf",
                type: "file",
                size: generateRandomSize(1 * 1024 * 1024, 5 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 8, 15)),
                modifiedDate: generateRandomDate(new Date(2023, 8, 15))
              },
              {
                id: generateId(),
                name: "Amendment_2024.docx",
                type: "file",
                size: generateRandomSize(200 * 1024, 1 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 1, 20)),
                modifiedDate: generateRandomDate(new Date(2024, 3, 10))
              },
              {
                id: generateId(),
                name: "NDA_Template.pdf",
                type: "file",
                size: generateRandomSize(150 * 1024, 800 * 1024),
                createdDate: generateRandomDate(new Date(2023, 11, 8)),
                modifiedDate: generateRandomDate(new Date(2024, 0, 15))
              }
            ]
          },
          {
            id: generateId(),
            name: "Meeting_Notes",
            type: "folder",
            createdDate: generateRandomDate(new Date(2024, 0, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
            children: [
              {
                id: generateId(),
                name: "Team_Meeting_July_2024.docx",
                type: "file",
                size: generateRandomSize(50 * 1024, 300 * 1024),
                createdDate: generateRandomDate(new Date(2024, 6, 15)),
                modifiedDate: generateRandomDate(new Date(2024, 6, 15))
              },
              {
                id: generateId(),
                name: "Client_Call_Notes.txt",
                type: "file",
                size: generateRandomSize(10 * 1024, 100 * 1024),
                createdDate: generateRandomDate(new Date(2024, 7, 3)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 8))
              }
            ]
          }
        ]
      },
      {
        id: generateId(),
        name: "Personal",
        type: "folder",
        createdDate: generateRandomDate(new Date(2022, 6, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "Health",
            type: "folder",
            createdDate: generateRandomDate(new Date(2022, 6, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 5, 1)),
            children: [
              {
                id: generateId(),
                name: "Medical_Records_2024.pdf",
                type: "file",
                size: generateRandomSize(200 * 1024, 1 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 3, 12)),
                modifiedDate: generateRandomDate(new Date(2024, 3, 12))
              },
              {
                id: generateId(),
                name: "Lab_Results.pdf",
                type: "file",
                size: generateRandomSize(300 * 1024, 2 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 1, 28)),
                modifiedDate: generateRandomDate(new Date(2024, 1, 28))
              },
              {
                id: generateId(),
                name: "Insurance_Card.jpg",
                type: "file",
                size: generateRandomSize(100 * 1024, 500 * 1024),
                createdDate: generateRandomDate(new Date(2023, 0, 10)),
                modifiedDate: generateRandomDate(new Date(2023, 0, 10))
              }
            ]
          },
          {
            id: generateId(),
            name: "Finance",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 0, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
            children: [
              {
                id: generateId(),
                name: "Tax_Return_2024.pdf",
                type: "file",
                size: generateRandomSize(1 * 1024 * 1024, 3 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 4, 15)),
                modifiedDate: generateRandomDate(new Date(2024, 4, 15))
              },
              {
                id: generateId(),
                name: "Bank_Statements",
                type: "folder",
                createdDate: generateRandomDate(new Date(2024, 0, 1)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
                children: [
                  {
                    id: generateId(),
                    name: "January_2024.pdf",
                    type: "file",
                    size: generateRandomSize(200 * 1024, 800 * 1024),
                    createdDate: generateRandomDate(new Date(2024, 1, 1)),
                    modifiedDate: generateRandomDate(new Date(2024, 1, 1))
                  },
                  {
                    id: generateId(),
                    name: "February_2024.pdf",
                    type: "file",
                    size: generateRandomSize(200 * 1024, 800 * 1024),
                    createdDate: generateRandomDate(new Date(2024, 2, 1)),
                    modifiedDate: generateRandomDate(new Date(2024, 2, 1))
                  }
                ]
              }
            ]
          },
          {
            id: generateId(),
            name: "Travel",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 3, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
            children: [
              {
                id: generateId(),
                name: "Passport_Copy.pdf",
                type: "file",
                size: generateRandomSize(500 * 1024, 2 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 3, 15)),
                modifiedDate: generateRandomDate(new Date(2023, 3, 15))
              },
              {
                id: generateId(),
                name: "Flight_Confirmation_Paris.pdf",
                type: "file",
                size: generateRandomSize(100 * 1024, 500 * 1024),
                createdDate: generateRandomDate(new Date(2024, 5, 20)),
                modifiedDate: generateRandomDate(new Date(2024, 5, 20))
              },
              {
                id: generateId(),
                name: "Hotel_Booking_London.pdf",
                type: "file",
                size: generateRandomSize(150 * 1024, 600 * 1024),
                createdDate: generateRandomDate(new Date(2024, 6, 5)),
                modifiedDate: generateRandomDate(new Date(2024, 6, 5))
              }
            ]
          }
        ]
      },
      {
        id: generateId(),
        name: "Education",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 8, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "Courses",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 8, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
            children: [
              {
                id: generateId(),
                name: "JavaScript_Advanced.pdf",
                type: "file",
                size: generateRandomSize(2 * 1024 * 1024, 10 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 9, 10)),
                modifiedDate: generateRandomDate(new Date(2024, 2, 15))
              },
              {
                id: generateId(),
                name: "React_Components_Guide.docx",
                type: "file",
                size: generateRandomSize(800 * 1024, 4 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 1, 8)),
                modifiedDate: generateRandomDate(new Date(2024, 6, 22))
              },
              {
                id: generateId(),
                name: "Database_Design_Notes.txt",
                type: "file",
                size: generateRandomSize(50 * 1024, 300 * 1024),
                createdDate: generateRandomDate(new Date(2024, 3, 12)),
                modifiedDate: generateRandomDate(new Date(2024, 7, 5))
              }
            ]
          },
          {
            id: generateId(),
            name: "Certificates",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 10, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 5, 1)),
            children: [
              {
                id: generateId(),
                name: "AWS_Cloud_Practitioner.pdf",
                type: "file",
                size: generateRandomSize(1 * 1024 * 1024, 3 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 11, 15)),
                modifiedDate: generateRandomDate(new Date(2023, 11, 15))
              },
              {
                id: generateId(),
                name: "Google_Analytics_Certified.jpg",
                type: "file",
                size: generateRandomSize(200 * 1024, 1 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 2, 20)),
                modifiedDate: generateRandomDate(new Date(2024, 2, 20))
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: "Pictures",
    type: "folder",
    createdDate: generateRandomDate(new Date(2021, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
    children: [
      {
        id: generateId(),
        name: "2024",
        type: "folder",
        createdDate: generateRandomDate(new Date(2024, 0, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "Vacation_Bahamas",
            type: "folder",
            createdDate: generateRandomDate(new Date(2024, 5, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 5, 15)),
            children: [
              {
                id: generateId(),
                name: "Beach_Sunset.jpg",
                type: "file",
                size: generateRandomSize(2 * 1024 * 1024, 8 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 5, 8)),
                modifiedDate: generateRandomDate(new Date(2024, 5, 8))
              },
              {
                id: generateId(),
                name: "Diving_Adventure.jpg",
                type: "file",
                size: generateRandomSize(3 * 1024 * 1024, 9 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 5, 10)),
                modifiedDate: generateRandomDate(new Date(2024, 5, 10))
              },
              {
                id: generateId(),
                name: "Resort_Pool.jpg",
                type: "file",
                size: generateRandomSize(2 * 1024 * 1024, 7 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 5, 12)),
                modifiedDate: generateRandomDate(new Date(2024, 5, 12))
              }
            ]
          },
          {
            id: generateId(),
            name: "Family_BBQ",
            type: "folder",
            createdDate: generateRandomDate(new Date(2024, 6, 4)),
            modifiedDate: generateRandomDate(new Date(2024, 6, 4)),
            children: [
              {
                id: generateId(),
                name: "Group_Photo.jpg",
                type: "file",
                size: generateRandomSize(4 * 1024 * 1024, 12 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 6, 4)),
                modifiedDate: generateRandomDate(new Date(2024, 6, 4))
              },
              {
                id: generateId(),
                name: "Grill_Master.jpg",
                type: "file",
                size: generateRandomSize(3 * 1024 * 1024, 10 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2024, 6, 4)),
                modifiedDate: generateRandomDate(new Date(2024, 6, 4))
              }
            ]
          }
        ]
      },
      {
        id: generateId(),
        name: "2023",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 0, 1)),
        modifiedDate: generateRandomDate(new Date(2023, 11, 31)),
        children: [
          {
            id: generateId(),
            name: "Christmas_2023.jpg",
            type: "file",
            size: generateRandomSize(5 * 1024 * 1024, 15 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2023, 11, 25)),
            modifiedDate: generateRandomDate(new Date(2023, 11, 25))
          },
          {
            id: generateId(),
            name: "New_Year_Party.jpg",
            type: "file",
            size: generateRandomSize(4 * 1024 * 1024, 12 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2023, 11, 31)),
            modifiedDate: generateRandomDate(new Date(2023, 11, 31))
          }
        ]
      },
      {
        id: generateId(),
        name: "Screenshots",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 5, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "Desktop_Screenshot_1.png",
            type: "file",
            size: generateRandomSize(500 * 1024, 3 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 7, 1)),
            modifiedDate: generateRandomDate(new Date(2024, 7, 1))
          },
          {
            id: generateId(),
            name: "App_Interface.png",
            type: "file",
            size: generateRandomSize(300 * 1024, 2 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 6, 25)),
            modifiedDate: generateRandomDate(new Date(2024, 6, 25))
          },
          {
            id: generateId(),
            name: "Error_Message.png",
            type: "file",
            size: generateRandomSize(100 * 1024, 800 * 1024),
            createdDate: generateRandomDate(new Date(2024, 6, 20)),
            modifiedDate: generateRandomDate(new Date(2024, 6, 20))
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: "Videos",
    type: "folder",
    createdDate: generateRandomDate(new Date(2022, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
    children: [
      {
        id: generateId(),
        name: "Tutorials",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 0, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
        children: [
          {
            id: generateId(),
            name: "React_Basics.mp4",
            type: "file",
            size: generateRandomSize(50 * 1024 * 1024, 200 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 1, 15)),
            modifiedDate: generateRandomDate(new Date(2024, 1, 15))
          },
          {
            id: generateId(),
            name: "CSS_Flexbox_Guide.mp4",
            type: "file",
            size: generateRandomSize(30 * 1024 * 1024, 120 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 3, 8)),
            modifiedDate: generateRandomDate(new Date(2024, 3, 8))
          },
          {
            id: generateId(),
            name: "JavaScript_ES6_Features.mp4",
            type: "file",
            size: generateRandomSize(40 * 1024 * 1024, 150 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 2, 20)),
            modifiedDate: generateRandomDate(new Date(2024, 2, 20))
          }
        ]
      },
      {
        id: generateId(),
        name: "Personal",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 6, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "Birthday_Party_2024.mp4",
            type: "file",
            size: generateRandomSize(100 * 1024 * 1024, 500 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 4, 15)),
            modifiedDate: generateRandomDate(new Date(2024, 4, 15))
          },
          {
            id: generateId(),
            name: "Wedding_Ceremony.mp4",
            type: "file",
            size: generateRandomSize(200 * 1024 * 1024, 800 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2023, 8, 20)),
            modifiedDate: generateRandomDate(new Date(2023, 8, 20))
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: "Downloads",
    type: "folder",
    createdDate: generateRandomDate(new Date(2023, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
    children: [
      {
        id: generateId(),
        name: "Software",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 6, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 7, 1)),
        children: [
          {
            id: generateId(),
            name: "VSCode_Installer.exe",
            type: "file",
            size: generateRandomSize(80 * 1024 * 1024, 120 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 5, 10)),
            modifiedDate: generateRandomDate(new Date(2024, 5, 10))
          },
          {
            id: generateId(),
            name: "Node_Setup.msi",
            type: "file",
            size: generateRandomSize(40 * 1024 * 1024, 80 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 4, 20)),
            modifiedDate: generateRandomDate(new Date(2024, 4, 20))
          },
          {
            id: generateId(),
            name: "Chrome_Browser.exe",
            type: "file",
            size: generateRandomSize(60 * 1024 * 1024, 100 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 3, 15)),
            modifiedDate: generateRandomDate(new Date(2024, 3, 15))
          }
        ]
      }
    ]
  },
  {
    id: generateId(),
    name: "Music",
    type: "folder",
    createdDate: generateRandomDate(new Date(2022, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
    children: [
      {
        id: generateId(),
        name: "Rock",
        type: "folder",
        createdDate: generateRandomDate(new Date(2022, 3, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
        children: [
          {
            id: generateId(),
            name: "Classic_Rock_Hits",
            type: "folder",
            createdDate: generateRandomDate(new Date(2023, 1, 1)),
            modifiedDate: generateRandomDate(new Date(2023, 1, 1)),
            children: [
              {
                id: generateId(),
                name: "Bohemian_Rhapsody.mp3",
                type: "file",
                size: generateRandomSize(8 * 1024 * 1024, 15 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 1, 15)),
                modifiedDate: generateRandomDate(new Date(2023, 1, 15))
              },
              {
                id: generateId(),
                name: "Stairway_to_Heaven.mp3",
                type: "file",
                size: generateRandomSize(10 * 1024 * 1024, 18 * 1024 * 1024),
                createdDate: generateRandomDate(new Date(2023, 1, 20)),
                modifiedDate: generateRandomDate(new Date(2023, 1, 20))
              }
            ]
          }
        ]
      },
      {
        id: generateId(),
        name: "Electronic",
        type: "folder",
        createdDate: generateRandomDate(new Date(2023, 5, 1)),
        modifiedDate: generateRandomDate(new Date(2024, 6, 1)),
        children: [
          {
            id: generateId(),
            name: "Synthwave_Collection.mp3",
            type: "file",
            size: generateRandomSize(6 * 1024 * 1024, 12 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 2, 10)),
            modifiedDate: generateRandomDate(new Date(2024, 2, 10))
          },
          {
            id: generateId(),
            name: "Ambient_Nights.mp3",
            type: "file",
            size: generateRandomSize(7 * 1024 * 1024, 14 * 1024 * 1024),
            createdDate: generateRandomDate(new Date(2024, 3, 5)),
            modifiedDate: generateRandomDate(new Date(2024, 3, 5))
          }
        ]
      }
    ]
  }
];

// Standalone files in root directory
export const files = [
  {
    id: generateId(),
    name: "README.txt",
    type: "file",
    size: generateRandomSize(5 * 1024, 50 * 1024),
    createdDate: generateRandomDate(new Date(2023, 0, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 6, 15))
  },
  {
    id: generateId(),
    name: "Quick_Notes.txt",
    type: "file",
    size: generateRandomSize(2 * 1024, 20 * 1024),
    createdDate: generateRandomDate(new Date(2024, 7, 1)),
    modifiedDate: generateRandomDate(new Date(2024, 7, 8))
  },
  {
    id: generateId(),
    name: "Desktop_Wallpaper.jpg",
    type: "file",
    size: generateRandomSize(2 * 1024 * 1024, 8 * 1024 * 1024),
    createdDate: generateRandomDate(new Date(2024, 5, 20)),
    modifiedDate: generateRandomDate(new Date(2024, 5, 20))
  },
  {
    id: generateId(),
    name: "System_Backup.zip",
    type: "file",
    size: generateRandomSize(500 * 1024 * 1024, 2 * 1024 * 1024 * 1024),
    createdDate: generateRandomDate(new Date(2024, 6, 30)),
    modifiedDate: generateRandomDate(new Date(2024, 6, 30))
  },
  {
    id: generateId(),
    name: "Project_Archive.rar",
    type: "file",
    size: generateRandomSize(100 * 1024 * 1024, 500 * 1024 * 1024),
    createdDate: generateRandomDate(new Date(2024, 4, 10)),
    modifiedDate: generateRandomDate(new Date(2024, 4, 10))
  }
];

// Export combined data for convenience
export const mockData = [...folders, ...files];
