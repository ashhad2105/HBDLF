import emailjs from 'emailjs-com';
import { tracker } from './interactionTracker';

const EMAILJS_SERVICE_ID = 'service_lignh9t';
const EMAILJS_TEMPLATE_ID = 'template_fs7s2bd';
const EMAILJS_USER_ID = 'q1wh7bz6HfG2oi_pA';
const RECIPIENT_EMAIL = 'mohammedashhad2105@gmail.com';

export const sendComprehensiveReport = async () => {
  try {
    console.log('🚀 Starting comprehensive email report...');
    
    // Finalize session and get all data
    const comprehensiveData = tracker.finalizeSesssion();
    
    // Format the email content
    const emailContent = formatComprehensiveReport(comprehensiveData);
    
    console.log('📧 Email content prepared, length:', emailContent.length);
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_name: 'Birthday Website Journey Tracker',
      subject: '🎂 Complete Birthday Website Experience Report - ' + new Date().toLocaleDateString(),
      message: emailContent,
      timestamp: new Date().toLocaleString(),
      session_duration: Math.round(comprehensiveData.totalTimeSpent / 1000 / 60) + ' minutes',
      total_interactions: comprehensiveData.interactions.length.toString()
    };
    
    console.log('📤 Sending email via EmailJS...');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('User ID:', EMAILJS_USER_ID);
    
    // Initialize EmailJS if not already done
    emailjs.init(EMAILJS_USER_ID);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );
    
    console.log('✅ Email sent successfully!', response);
    console.log('Response status:', response.status);
    console.log('Response text:', response.text);
    
    // Silent success - no user notification
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Silent failure - no user notification
    return { success: false, error };
  }
};

const formatComprehensiveReport = (data: any): string => {
  const sessionDuration = Math.round(data.totalTimeSpent / 1000 / 60); // minutes
  const sessionDurationSeconds = Math.round(data.totalTimeSpent / 1000); // seconds
  
  let report = `🎂✨ BIRTHDAY WEBSITE COMPLETE JOURNEY REPORT ✨🎂\n\n`;
  
  report += `═══════════════════════════════════════════════════════\n`;
  report += `📊 SESSION OVERVIEW\n`;
  report += `═══════════════════════════════════════════════════════\n`;
  report += `🕐 Session Start: ${new Date(data.sessionStart).toLocaleString()}\n`;
  report += `🕐 Session End: ${data.sessionEnd ? new Date(data.sessionEnd).toLocaleString() : 'In Progress'}\n`;
  report += `⏱️ Total Time Spent: ${sessionDuration} minutes (${sessionDurationSeconds} seconds)\n`;
  report += `🖱️ Total Interactions: ${data.interactions.length}\n`;
  report += `🎭 Stages Completed: ${data.stageProgression.length}\n\n`;
  
  // Stage progression with detailed timing
  report += `═══════════════════════════════════════════════════════\n`;
  report += `🎭 DETAILED STAGE PROGRESSION\n`;
  report += `═══════════════════════════════════════════════════════\n`;
  data.stageProgression.forEach((stage: any, index: number) => {
    const timeSpent = Math.round(stage.timeSpent / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    report += `${index + 1}. 📖 ${stage.stage.toUpperCase()}: ${timeString}\n`;
  });
  report += `\n`;
  
  // Game results with detailed breakdown
  if (data.gameData) {
    report += `═══════════════════════════════════════════════════════\n`;
    report += `🎮 MINI GAMES DETAILED RESULTS\n`;
    report += `═══════════════════════════════════════════════════════\n`;
    report += `📝 Quiz Performance:\n`;
    report += `   • Final Score: ${data.gameData.quizScore}/5 (${Math.round((data.gameData.quizScore/5)*100)}%)\n`;
    report += `   • Answer Pattern: [${data.gameData.quizAnswers.join(', ')}]\n`;
    report += `   • Performance: ${data.gameData.quizScore === 5 ? 'PERFECT! 🏆' : data.gameData.quizScore >= 3 ? 'EXCELLENT! 🌟' : 'SWEET EFFORT! 💕'}\n\n`;
    
    report += `🧩 Puzzle Challenge:\n`;
    report += `   • Status: ${data.gameData.puzzleCompleted ? '✅ COMPLETED' : '❌ Not Completed'}\n`;
    if (data.gameData.puzzleCompleted) {
      const puzzleMinutes = Math.floor(data.gameData.puzzleTime / 60);
      const puzzleSeconds = data.gameData.puzzleTime % 60;
      const puzzleTimeString = puzzleMinutes > 0 ? `${puzzleMinutes}m ${puzzleSeconds}s` : `${puzzleSeconds}s`;
      report += `   • Completion Time: ${puzzleTimeString}\n`;
      report += `   • Speed Rating: ${data.gameData.puzzleTime < 60 ? 'LIGHTNING FAST! ⚡' : data.gameData.puzzleTime < 120 ? 'QUICK SOLVER! 🚀' : 'THOUGHTFUL APPROACH! 🤔'}\n`;
    }
    report += `\n`;
  }
  
  // Dreams data with emotional analysis
  if (data.dreamsData) {
    report += `═══════════════════════════════════════════════════════\n`;
    report += `✨ FUTURE DREAMS TOGETHER\n`;
    report += `═══════════════════════════════════════════════════════\n`;
    const percentage = Math.round((data.dreamsData.checkedCount / data.dreamsData.totalDreams) * 100);
    report += `💫 Dreams Selected: ${data.dreamsData.checkedCount}/${data.dreamsData.totalDreams} (${percentage}%)\n`;
    report += `🎯 Engagement Level: ${percentage >= 80 ? 'HIGHLY ENGAGED! 💖' : percentage >= 50 ? 'THOUGHTFULLY SELECTIVE! 🌟' : 'CAREFULLY CHOSEN! 💕'}\n`;
    report += `📋 Selected Dream IDs: [${data.dreamsData.checkedDreams.join(', ')}]\n`;
    report += `⏰ Dreams Completed At: ${new Date(data.dreamsData.timestamp).toLocaleString()}\n\n`;
  }
  
  // Key emotional moments
  report += `═══════════════════════════════════════════════════════\n`;
  report += `💝 KEY EMOTIONAL MOMENTS\n`;
  report += `═══════════════════════════════════════════════════════\n`;
  
  const emotionalMoments = data.interactions.filter((i: any) => 
    ['heart_clicked', 'candles_blown', 'cake_sliced', 'gift_opened', 'timeline_event_viewed'].includes(i.action)
  );
  
  if (emotionalMoments.length > 0) {
    emotionalMoments.forEach((moment: any, index: number) => {
      const time = new Date(moment.timestamp).toLocaleTimeString();
      let emoji = '💖';
      let description = moment.action;
      
      switch(moment.action) {
        case 'heart_clicked': emoji = '💕'; description = 'Discovered a reason why I love her'; break;
        case 'candles_blown': emoji = '🎂'; description = 'Made a birthday wish'; break;
        case 'cake_sliced': emoji = '🍰'; description = 'Cut the birthday cake'; break;
        case 'gift_opened': emoji = '🎁'; description = 'Opened a special gift'; break;
        case 'timeline_event_viewed': emoji = '📖'; description = 'Explored our love story'; break;
      }
      
      report += `${index + 1}. ${emoji} [${time}] ${description}`;
      if (moment.details) {
        report += ` (${JSON.stringify(moment.details)})`;
      }
      report += `\n`;
    });
  } else {
    report += `💕 Every moment was filled with love and wonder!\n`;
  }
  
  // Interaction timeline summary
  report += `\n═══════════════════════════════════════════════════════\n`;
  report += `📈 ENGAGEMENT ANALYTICS\n`;
  report += `═══════════════════════════════════════════════════════\n`;
  
  const clickInteractions = data.interactions.filter((i: any) => i.action === 'click').length;
  const heartClicks = data.interactions.filter((i: any) => i.action === 'heart_clicked').length;
  const stageChanges = data.interactions.filter((i: any) => i.action === 'stage_change').length;
  
  report += `🖱️ Total Clicks: ${clickInteractions}\n`;
  report += `💕 Hearts Discovered: ${heartClicks}\n`;
  report += `🎭 Stages Navigated: ${stageChanges}\n`;
  report += `⚡ Interaction Rate: ${Math.round(data.interactions.length / (sessionDurationSeconds / 60))} interactions/minute\n`;
  report += `🎯 Engagement Score: ${data.interactions.length > 50 ? 'HIGHLY ENGAGED! 🌟' : data.interactions.length > 25 ? 'WONDERFULLY ACTIVE! 💖' : 'BEAUTIFULLY PRESENT! 💕'}\n\n`;
  
  // Final love message
  report += `═══════════════════════════════════════════════════════\n`;
  report += `💖 FINAL LOVE SUMMARY\n`;
  report += `═══════════════════════════════════════════════════════\n`;
  report += `This report captures every precious moment of her birthday journey through your\n`;
  report += `digital love letter. From the first password entry to the final celebration,\n`;
  report += `every click, every pause, every interaction shows how she experienced your love\n`;
  report += `across the miles. This data is more than numbers - it's the digital footprint\n`;
  report += `of a heart feeling loved and celebrated on her special day! 🎂💕\n\n`;
  
  report += `🌟 Her journey through your love was: ${sessionDuration} minutes of pure magic! ✨\n`;
  report += `💝 Total love interactions captured: ${data.interactions.length} precious moments!\n`;
  report += `🎉 Birthday mission status: ABSOLUTELY SUCCESSFUL! 🎊\n\n`;
  
  report += `Forever yours across every mile,\n`;
  report += `Your Birthday Website Love Tracker 💖\n`;
  report += `═══════════════════════════════════════════════════════`;
  
  return report;
};