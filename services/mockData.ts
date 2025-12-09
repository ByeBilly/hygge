import { User, Match, Message } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    name: 'Elara',
    age: 26,
    city: 'Portland',
    bio: 'Looking for someone to share silence with comfortably.',
    cozyEvening: 'Rain against the window, a warm blanket, and a lo-fi playlist.',
    cozyThings: ['Oat milk lattes', 'Old bookstores', 'Oversized sweaters'],
    interests: ['Reading', 'Indie Folk', 'Pottery', 'Hiking'],
    photos: ['https://picsum.photos/400/600?random=1', 'https://picsum.photos/400/600?random=11'],
    gender: 'woman',
    interestedIn: ['man', 'woman']
  },
  {
    id: 'user_2',
    name: 'Liam',
    age: 29,
    city: 'Seattle',
    bio: 'Software engineer by day, acoustic guitarist by night.',
    cozyEvening: 'Cooking a slow stew while listening to jazz vinyls.',
    cozyThings: ['Log cabins', 'Wool socks', 'Fresh bread'],
    interests: ['Cooking', 'Music', 'Tech', 'Camping'],
    photos: ['https://picsum.photos/400/600?random=2', 'https://picsum.photos/400/600?random=22'],
    gender: 'man',
    interestedIn: ['woman']
  },
  {
    id: 'user_3',
    name: 'Sofia',
    age: 24,
    city: 'Austin',
    bio: 'Plant mom and yoga enthusiast.',
    cozyEvening: 'Incense burning, chamomile tea, and a Ghibli movie.',
    cozyThings: ['Succulents', 'Essential oils', 'Soft lighting'],
    interests: ['Yoga', 'Anime', 'Gardening', 'Vegan Food'],
    photos: ['https://picsum.photos/400/600?random=3', 'https://picsum.photos/400/600?random=33'],
    gender: 'woman',
    interestedIn: ['man', 'woman', 'non-binary']
  },
  {
    id: 'user_4',
    name: 'Noah',
    age: 28,
    city: 'Denver',
    bio: 'Photographer chasing golden hours.',
    cozyEvening: 'Editing photos by the fireplace with a glass of red wine.',
    cozyThings: ['Film cameras', 'Fireplaces', 'Acoustic covers'],
    interests: ['Photography', 'Travel', 'Coffee', 'Art'],
    photos: ['https://picsum.photos/400/600?random=4', 'https://picsum.photos/400/600?random=44'],
    gender: 'man',
    interestedIn: ['woman']
  },
  {
    id: 'user_5',
    name: 'Alex',
    age: 25,
    city: 'Brooklyn',
    bio: 'Barista and aspiring writer.',
    cozyEvening: 'Writing poetry while it snows outside.',
    cozyThings: ['Typewriters', 'Vinyl', 'Rooftops'],
    interests: ['Writing', 'Poetry', 'Coffee', 'Cats'],
    photos: ['https://picsum.photos/400/600?random=5'],
    gender: 'non-binary',
    interestedIn: ['man', 'woman', 'non-binary']
  }
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match_1',
    users: ['me', 'user_1'],
    lastMessage: 'That sounds absolutely lovely. I love rainy days too.',
    lastMessageAt: Date.now() - 3600000,
    unread: true
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'match_1': [
    {
      id: 'msg_1',
      matchId: 'match_1',
      senderId: 'user_1',
      text: 'Hi! I saw you like old bookstores. Have you been to Powell\'s?',
      createdAt: Date.now() - 86400000
    },
    {
      id: 'msg_2',
      matchId: 'match_1',
      senderId: 'me',
      text: 'Yes! I could get lost in there for days. What is your favorite section?',
      createdAt: Date.now() - 80000000
    },
    {
      id: 'msg_3',
      matchId: 'match_1',
      senderId: 'user_1',
      text: 'Definitely the rare books room. It feels so... historic. Perfect cozy evening material.',
      createdAt: Date.now() - 7200000
    },
    {
      id: 'msg_4',
      matchId: 'match_1',
      senderId: 'user_1',
      text: 'That sounds absolutely lovely. I love rainy days too.',
      createdAt: Date.now() - 3600000
    }
  ]
};