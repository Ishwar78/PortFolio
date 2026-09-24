const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    period: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: true }
);

const aboutSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: 'ABOUT ME' },
      heading: { type: String, default: 'Get To Know' },
      headingHighlight: { type: String, default: 'Me Better' },
      description: {
        type: String,
        default:
          "I'm Ishwar Sharma, a Full Stack Developer who loves building modern web applications, solving real-world problems, learning new technologies, and turning ideas into useful digital products.",
      },
      resumeLink: { type: String, default: '/resume.pdf' },
      contactLink: { type: String, default: '/contact' },
      image: { type: String, default: '/assets/ishwar-profile.jpg' },
      stat1Value: { type: String, default: '2+' },
      stat1Label: { type: String, default: 'Years Experience' },
      stat2Value: { type: String, default: '10+' },
      stat2Label: { type: String, default: 'Projects Completed' },
      stat3Value: { type: String, default: 'MCA' },
      stat3Label: { type: String, default: 'MDU Rohtak' },
      stat4Value: { type: String, default: 'Rohtak' },
      stat4Label: { type: String, default: 'Haryana, India' },
    },
    story: {
      eyebrow: { type: String, default: 'MY STORY' },
      heading: { type: String, default: 'From Curiosity' },
      headingHighlight: { type: String, default: 'to Code' },
      paragraph1: {
        type: String,
        default:
          'I started my journey with a curiosity about how websites work, and that curiosity turned into a passion for development. Over time, I have worked on multiple projects, learned modern technologies, and gained hands-on experience in building real-world applications.',
      },
      paragraph2: {
        type: String,
        default:
          'I believe in continuous learning and always try to improve my skills, explore new tools, and take on challenging projects that create value.',
      },
      name: { type: String, default: 'Ishwar Sharma' },
      email: { type: String, default: 'ishwarweb@gmail.com' },
      location: { type: String, default: 'Rohtak, Haryana' },
      education: { type: String, default: 'MCA – MDU Rohtak' },
      languages: { type: String, default: 'English, Hindi' },
      image: { type: String, default: '/assets/about-preview.png' },
    },
    journey: {
      eyebrow: { type: String, default: 'MY JOURNEY' },
      heading: { type: String, default: 'Education & Experience' },
      milestones: {
        type: [milestoneSchema],
        default: [
          {
            title: 'BCA – MDU Rohtak',
            period: '2019 – 2022',
            description: "Bachelor's in Computer Applications.",
          },
          {
            title: 'MCA – MDU Rohtak',
            period: '2022 – 2024',
            description: "Master's in Computer Applications.",
          },
          {
            title: 'Full Stack Developer (Intern)',
            period: 'Sep 2023 – Feb 2024',
            description: 'Java, Spring Boot, React and real-world projects.',
          },
          {
            title: 'Technical Supervisor',
            period: 'Wipro',
            description: 'Technical operations, monitoring and troubleshooting.',
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model('About', aboutSchema);

module.exports = About;
