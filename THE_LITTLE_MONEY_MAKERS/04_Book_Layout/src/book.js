// THE LITTLE MONEY MAKERS — manuscript data (single source of truth for every edition).
// British English spelling throughout. Rupee amounts use the ₹ sign.

const META = {
  title: 'The Little Money Makers',
  subtitle: 'A Journey to a Smarter Future',
  tagline: 'Small Lessons. Big Dreams. A Smarter Future.',
  ages: 'Ages 6–10',
  author: process.env.BOOK_AUTHOR || '', // set BOOK_AUTHOR="Your Name" and rebuild to print an author credit
  year: 2026,
  language: 'en-GB',
};

// accent colours by part of the story
const A = { money: '#d98a1c', save: '#3f8f4f', habit: '#2f8a7e', lead: '#2d5f9c', heart: '#d9506f', end: '#7a5cb0' };

const PAGES = [
  { n: 1, id: 'p01', type: 'title' },

  { n: 2, id: 'p02', title: 'Meet Aarav', accent: A.money,
    text: ['This is Aarav. He is eight years old, and he is full of questions. Why is the sky blue? How do aeroplanes fly? And where does money come from?',
      'Aarav lives with Mum, Dad and his little sister, Anya, who is six. Anya loves to laugh, and she always cheers for her big brother. Aarav has a big dream: he wants to grow up to be clever, kind and successful.'],
    quote: 'Every big journey starts with one curious question.',
    think: 'What is one big dream you have?' },

  { n: 3, id: 'p03', title: 'The Dream Bicycle', accent: A.money,
    text: ['One sunny afternoon, Aarav and Anya walk past a bicycle shop. In the window stands a shiny red bicycle with a silver bell. Aarav presses his nose against the glass.',
      'Then he sees the price tag: ₹5,000. “That’s a lot of money,” he whispers. “How can I ever get it?”'],
    quote: 'A dream is the first step. A plan is the second.',
    think: 'Is there something you really, really want? Why do you want it?' },

  { n: 4, id: 'p04', title: 'Needs vs Wants', accent: A.money,
    text: ['At dinner, Aarav asks Dad to buy the bicycle. Dad smiles. “First, let’s learn something important,” he says. “There are needs, and there are wants.”'],
    boxes: [
      { head: 'Needs', color: '#3f8f4f', body: 'Things we must have to live and stay healthy: food, water, a home, clothes, medicine and school books.' },
      { head: 'Wants', color: '#e06a52', body: 'Things that are nice to have, but we can live without: toys, video games, sweets and a new bicycle.' }],
    quote: 'Needs come first. Wants can wait.',
    think: 'Is an umbrella a need or a want on a rainy day? What about on a sunny day?' },

  { n: 5, id: 'p05', title: 'Meet the Piggy Bank', accent: A.save,
    text: ['That evening, Anya runs into Aarav’s room holding something pink and round. It is her old piggy bank. “You can have it,” she says. “I’m getting a new one for my birthday!”',
      'Aarav finds three coins in his pocket. Clink, clink, clink! They drop inside. It is the very first step towards his bicycle.'],
    quote: 'Every big savings pot starts with one small coin.',
    think: 'Where could you keep your savings safe at home?' },

  { n: 6, id: 'p06', title: 'Why Saving Matters', accent: A.save,
    text: ['“Dad, why should I save?” asks Aarav. “Can’t I just ask you for money when I need it?”',
      'Dad points to the coins on the table, from the smallest pile to the tallest. “Saving gives you freedom,” he says. “It helps you reach your goals, it keeps you ready for surprises, and it lets you make your own choices.”'],
    quote: 'Save a little today. Smile a lot tomorrow.',
    think: 'What kind of surprise might you need savings for?' },

  { n: 7, id: 'p07', title: 'The Three Money Jars', accent: A.save,
    text: ['The next day, Dad brings three glass jars and helps Aarav label them. “Whenever you get money,” Dad says, “split it into three parts.”'],
    jars: [
      { head: 'Save', color: '#3f8f4f', body: 'For future goals, like the bicycle.' },
      { head: 'Spend', color: '#3f7fcc', body: 'For small things now, like a pencil or a treat.' },
      { head: 'Share', color: '#d9506f', body: 'To help others or to give a gift.' }],
    quote: 'Save, spend and share — and your money will be wise and kind.',
    think: 'If you had ₹10, how would you split it between the three jars?' },

  { n: 8, id: 'p08', title: 'A Visit to the Bank', accent: A.save,
    text: ['On Saturday, Dad takes Aarav to the bank. A friendly manager called Mrs Kapoor welcomes them.',
      '“A bank keeps people’s money safe,” she explains. “It also helps families save for big things, like education or a home.” With Dad’s help, Aarav opens his very first savings account. He feels very grown-up!'],
    quote: 'A bank is a safe home for your savings.',
    note: 'Grown-up tip: Children’s savings accounts are opened and managed with a parent or guardian.' },

  { n: 9, id: 'p09', title: 'How Money Can Grow', accent: A.save,
    text: ['Mrs Kapoor draws a little picture. “When you keep money in a savings account, the bank adds a small extra amount. This extra money is called interest.”',
      'Let’s pretend Aarav keeps ₹100 in the bank, and the bank adds ₹10 after one year. Now he has ₹110! The next year, interest is added to the whole ₹110, so he has ₹121. His money grew while he waited!'],
    note: 'This is a pretend example with easy numbers. Real banks usually add less than this, and interest rates can go up and down.',
    quote: 'Money can work for you when you save it wisely.' },

  { n: 10, id: 'p10', title: 'A Small Mistake', accent: A.money,
    text: ['A few weeks later, a friend shows Aarav a new video game. “Everyone has it!” says his friend. Without stopping to think, Aarav opens his piggy bank and buys the game.',
      'For one evening, he plays and plays. But at bedtime, he looks at his piggy bank. It feels very light.'],
    quote: 'A quick “yes” can turn into a long “oh no”.',
    think: 'Have you ever bought something and wished you hadn’t?' },

  { n: 11, id: 'p11', title: 'The Power of Patience', accent: A.money,
    text: ['The next morning, Dad finds Aarav looking sad. He doesn’t scold him. Instead, they plant a mango seed together. “This seed won’t become a tree tomorrow,” says Dad. “It needs water and time. Savings are just the same.” Then Dad teaches Aarav a simple rule.'],
    rule: { head: 'The Pause Rule', steps: [['Stop', 'Don’t buy it straight away.'], ['Think', 'Is it a need or a want? Does it help my goal?'], ['Wait', 'Wait one day. If you still want it, talk to a grown-up.']] },
    quote: 'Patience turns small efforts into big results.' },

  { n: 12, id: 'p12', title: 'A Disciplined Friend', accent: A.habit,
    text: ['Aarav’s best friend, Rohan, always seems to have time for everything. He finishes his homework, reads every day and still plays football in the park!',
      '“How do you do it?” asks Aarav. Rohan grins. “I follow a simple routine. Discipline means doing what you planned, even when it’s hard.”'],
    quote: 'Small habits create big futures.',
    think: 'What is one thing you do every single day?' },

  { n: 13, id: 'p13', title: 'Good Habits vs Bad Habits', accent: A.habit,
    text: ['That night, Aarav makes two lists. He wants to see which habits help him grow, and which ones slow him down.'],
    lists: [
      { head: 'Good habits help me grow', color: '#3f8f4f', mark: 'tick', items: ['Waking up on time', 'Reading every day', 'Saving some money', 'Playing outside and exercising', 'Finishing homework on time', 'Eating fruit and vegetables'] },
      { head: 'Bad habits slow me down', color: '#c0473b', mark: 'cross', items: ['Too much time on screens', 'Spending without thinking', 'Putting things off until later', 'Going to bed late', 'Eating too much junk food', 'Giving up too quickly'] }],
    quote: 'Choose the habits that make you stronger.' },

  { n: 14, id: 'p14', title: 'Why Reading Books Matters', accent: A.habit,
    text: ['Rohan lends Aarav a book about a girl who builds a rocket. Aarav reads it under the big tree in the park. Suddenly, he is flying past planets and visiting castles!',
      'Books take Aarav to new places. They give him new words, new ideas and new ways to think.'],
    chips: ['New ideas', 'Better thinking', 'More words', 'Big dreams'],
    quote: 'Knowledge is an investment that never goes to waste.',
    think: 'What is your favourite book, and why?' },

  { n: 15, id: 'p15', title: 'Setting Smart Goals', accent: A.save,
    text: ['Aarav decides it is time for a clear plan. He takes a big sheet of paper and writes down his goal. A smart goal says exactly what you want, how much you need and when you will get there.',
      'Aarav still has ₹1,000 in his piggy bank, so he needs ₹4,000 more. If he saves ₹400 every month, he will reach his goal in 10 months.'],
    quote: 'Don’t just dream. Take one small step.',
    think: 'Can you check Aarav’s maths? What is ₹400 × 10?' },

  { n: 16, id: 'p16', title: 'Learning Time Management', accent: A.habit,
    text: ['Aarav realises that time is a lot like money. If he doesn’t plan it, it slips away! So he makes a daily plan and sticks it on his wall.'],
    schedule: [['6:30 am', 'Wake up and stretch'], ['7:00 am', 'Get ready for school'], ['4:00 pm', 'Snack and homework'], ['5:00 pm', 'Play outside'], ['6:30 pm', 'Read a book'], ['7:00 pm', 'Help at home and family time'], ['7:45 pm', 'Dinner'], ['8:30 pm', 'Lights out and sleep']],
    quote: 'Your time is more valuable than gold.' },

  { n: 17, id: 'p17', title: 'Becoming a Good Leader', accent: A.lead,
    text: ['At school, Ms Rao, the class teacher, asks Aarav to lead a team for the science fair. Aarav feels nervous. What if he gets it wrong?',
      'Then he remembers what Dad told him: a good leader listens first. So he asks each team member what they enjoy doing. Soon, everyone has a job that suits them.'],
    quote: 'A good leader helps everyone do their best.',
    think: 'When have you helped a group work together?' },

  { n: 18, id: 'p18', title: 'The Power of Teamwork', accent: A.lead,
    text: ['The team builds a model of a wind turbine that lights up a tiny village. Meera paints the houses. Kabir connects the wires. Rohan builds the turbine. Aarav keeps the plan and checks that everyone has what they need.',
      'When something gets stuck, they solve the problem together.'],
    quote: 'Together, we can do more than any of us can alone.',
    think: 'What job would you choose in Aarav’s team?' },

  { n: 19, id: 'p19', title: 'Learning to Communicate', accent: A.lead,
    text: ['Sometimes the team doesn’t agree. Meera wants blue houses, and Kabir wants red ones! Aarav helps everyone talk it through. They take turns, listen carefully and find an answer they all like: blue and red houses!'],
    steps: ['Listen carefully.', 'Speak clearly and calmly.', 'Be kind and respectful.', 'Share your ideas with confidence.'],
    quote: 'Good communication builds strong friendships.' },

  { n: 20, id: 'p20', title: 'Facing Failure', accent: A.lead,
    text: ['On the day of the science fair, the team proudly shows its model. But the judges give the trophy to another team.',
      'Aarav’s shoulders drop. Meera wipes away a tear. Even Rohan is quiet. It is okay to feel sad. Big feelings are part of trying something hard.'],
    quote: 'It’s okay to feel sad. Then we can try again.',
    think: 'What helps you feel better when things go wrong?' },

  { n: 21, id: 'p21', title: 'Turning Mistakes into Lessons', accent: A.lead,
    text: ['The next day, Ms Rao sits down with the team. Together, they make two lists: what went well, and what they can do better next time.',
      'Their turbine worked beautifully, but they ran out of time to explain their idea clearly. Next time, they will practise their talk!'],
    quote: 'Mistakes are lessons in disguise.',
    think: 'Think of a mistake you made. What did it teach you?' },

  { n: 22, id: 'p22', title: 'Helping Someone in Need', accent: A.heart,
    text: ['One morning, Aarav notices his classmate Ishaan sitting alone. Ishaan’s schoolbooks are old and torn, and his family can’t buy new ones right now.',
      'Aarav remembers his Share jar. With Mum’s help, he buys two new notebooks, and he gives Ishaan some of his own books that are still in good condition. He does it quietly and kindly, just like a good friend should.'],
    quote: 'Real wealth isn’t just what you have. It’s also what you share.',
    think: 'Who could you help this week, and how?' },

  { n: 23, id: 'p23', title: 'A Little Business', accent: A.money,
    text: ['Aarav has an idea. He loves drawing, and his classmates love reading. Why not make bookmarks? With Mum’s help, he spends ₹100 on card and colours. He and Anya make 30 colourful bookmarks and sell them at the school fair for ₹10 each. Mum helps them write down every rupee.'],
    ledger: [['Money in', '30 bookmarks × ₹10', '₹300'], ['Money out', 'Card and colours', '₹100'], ['Profit', 'Money left over', '₹200']],
    note: 'Grown-up tip: Children’s business activities should always be supervised by a parent or guardian.',
    quote: 'Solve a small problem, and you create value.' },

  { n: 24, id: 'p24', title: 'Making a Smart Decision', accent: A.money,
    text: ['Aarav counts his profit: ₹200! Then a friend tells him about another new game. For a moment, Aarav is tempted. But he remembers the Pause Rule: stop, think, wait.',
      'The next day, he makes his choice. He puts ₹140 in his Save jar, ₹40 in his Spend jar and ₹20 in his Share jar.'],
    quote: 'A smart decision today brings you closer to your big goal.',
    think: 'Do Aarav’s three amounts add up to ₹200?' },

  { n: 25, id: 'p25', title: 'The Dream Comes True', accent: A.save,
    text: ['Months pass. Aarav saves his pocket money, his birthday money and his bookmark profits. Coin by coin, his savings grow. At last, he counts them with Dad: ₹5,000!',
      'The whole family goes to the shop together, and Aarav buys the shiny red bicycle. Mum and Dad give him a helmet to keep him safe. He feels proud — not just because of the bicycle, but because of everything he learned along the way.'],
    quote: 'Big dreams come true one small step at a time.' },

  { n: 26, id: 'p26', title: '10 Golden Life Lessons', accent: A.end, type: 'lessons',
    lessons: ['Know the difference between needs and wants.', 'Save first, spend wisely and always share.', 'Be patient: good things take time.', 'Pause before you buy: stop, think, wait.', 'Build good habits, one day at a time.', 'Read books and never stop learning.', 'Set clear goals and plan your time.', 'Lead by listening, and work as a team.', 'Learn from mistakes and never give up.', 'Be kind, honest and helpful to others.'],
    quote: 'Being rich starts with making wise choices.',
    note: 'Money is a helpful tool. But family, health, kindness and learning are the greatest treasures of all.' },

  { n: 27, id: 'p27', title: 'Activities and Challenges', accent: A.end, type: 'activities' },
  { n: 28, id: 'p28', title: 'Parent–Child Discussion', accent: A.end, type: 'discussion',
    intro: 'Stories are even better when we talk about them together. Choose a few questions and share your own answers too.',
    questions: ['What was Aarav’s biggest lesson? What was yours?', 'What is the difference between a need and a want? Can you name three of each?', 'Why did Aarav feel sad after buying the game? What would you have done?', 'What goal would you like to save for? How could you plan for it?', 'Which good habit would you like to start this week?', 'How can you be a good leader at home or at school?', 'Who could you help this month, and how?'],
    tip: 'Try giving your child a small, regular amount of pocket money and three jars. Let them make small choices — and small mistakes — while the stakes are low.',
    ending: 'Let’s learn, grow and build a brighter future together!' },

  { n: 29, id: 'w1', type: 'worksheet', kind: 'goal', title: 'My Money Goal', accent: A.save },
  { n: 30, id: 'w2', type: 'worksheet', kind: 'needs', title: 'Needs or Wants?', accent: A.money },
  { n: 31, id: 'w3', type: 'worksheet', kind: 'jars', title: 'My Three Money Jars', accent: A.save },
  { n: 32, id: 'w4', type: 'worksheet', kind: 'habits', title: 'My 7-Day Good Habit Tracker', accent: A.habit },
  { n: 33, id: 'w5', type: 'worksheet', kind: 'routine', title: 'My Daily Routine Planner', accent: A.habit },
  { n: 34, id: 'w6', type: 'worksheet', kind: 'business', title: 'My First Little Business', accent: A.money },
  { n: 35, id: 'notes', type: 'notes', title: 'A Note for Grown-ups', accent: A.end },
  { n: 36, id: 'credits', type: 'credits', title: 'About This Book', accent: A.end },
];

const BACK = {
  blurb: 'Aarav dreams of a shiny red bicycle — but it costs ₹5,000! With a pink piggy bank, three money jars, a helpful dad and a few mistakes along the way, Aarav discovers how saving, patience, teamwork and kindness can turn a big dream into reality.',
  benefits: ['Needs vs wants, saving and sharing', 'Simple budgeting and goal setting', 'Good habits and time management', 'Leadership, teamwork and kindness', 'Learning from mistakes', '6 printable activity worksheets'],
};

module.exports = { META, PAGES, BACK };
