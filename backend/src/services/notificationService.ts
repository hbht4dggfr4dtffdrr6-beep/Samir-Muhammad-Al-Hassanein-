import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailNotification = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendAnimeReleaseNotification = async (
  email: string,
  animeTitle: string,
  releaseDate: string
) => {
  const html = `
    <h2>🎉 Anime Release Notification</h2>
    <p>Your favorite anime <strong>${animeTitle}</strong> is being released!</p>
    <p><strong>Release Date:</strong> ${releaseDate}</p>
    <p><a href="${process.env.FRONTEND_URL}">View on Anime Release Tracker</a></p>
  `;

  return sendEmailNotification({
    to: email,
    subject: `${animeTitle} is releasing soon!`,
    html,
  });
};

export const sendNewEpisodeNotification = async (
  email: string,
  animeTitle: string,
  episodeNumber: number,
  releaseDate: string
) => {
  const html = `
    <h2>🎬 New Episode Released</h2>
    <p>Episode <strong>${episodeNumber}</strong> of <strong>${animeTitle}</strong> is now available!</p>
    <p><strong>Release Date:</strong> ${releaseDate}</p>
    <p><a href="${process.env.FRONTEND_URL}">Watch now on Anime Release Tracker</a></p>
  `;

  return sendEmailNotification({
    to: email,
    subject: `${animeTitle} - Episode ${episodeNumber} Released`,
    html,
  });
};
