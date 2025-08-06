import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import referralData from './referal.json';

const { width } = Dimensions.get('window');

// Simple icon components for web compatibility
const Icon = ({ name, size = 24, color = '#000', style }) => {
  const getIconSymbol = (iconName) => {
    const icons = {
      'person-circle': '👤',
      'checkmark-circle': '✅',
      'star': '⭐',
      'people': '👥',
      'add': '+',
      'people-outline': '👥',
      'trophy-outline': '🏆',
    };
    return icons[iconName] || '●';
  };

  return (
    <Text style={[{ fontSize: size, color }, style]}>
      {getIconSymbol(name)}
    </Text>
  );
};

export default function App() {
  const [referrals, setReferrals] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setReferrals(referralData.referrals);
    calculateLeaderboard(referralData.referrals);
  }, []);

  const calculateLeaderboard = (referralList) => {
    // Calculate points for each person
    const pointsMap = {};
    
    // Initialize everyone with 0 points
    referralList.forEach(person => {
      pointsMap[person.referralCode] = {
        name: person.name,
        email: person.email,
        referralCode: person.referralCode,
        points: 0,
        referrals: []
      };
    });

    // Calculate points based on referrals
    referralList.forEach(person => {
      if (person.referredBy) {
        // Find who referred this person
        const referrer = referralList.find(r => r.referralCode === person.referredBy);
        if (referrer && pointsMap[referrer.referralCode]) {
          pointsMap[referrer.referralCode].points += 1;
          pointsMap[referrer.referralCode].referrals.push(person.name);
        }
      }
    });

    // Convert to array and sort by points (descending)
    const leaderboardArray = Object.values(pointsMap).sort((a, b) => b.points - a.points);
    setLeaderboard(leaderboardArray);
  };

  const LeaderboardCard = ({ item, index, rank }) => {
    const getRankIcon = (position) => {
      if (position === 1) return '🥇';
      if (position === 2) return '🥈';
      if (position === 3) return '🥉';
      return `#${position}`;
    };

    const getRankColor = (position) => {
      if (position === 1) return '#FFD700'; // Gold
      if (position === 2) return '#C0C0C0'; // Silver
      if (position === 3) return '#CD7F32'; // Bronze
      return '#44DBC8'; // Accent color
    };

    return (
      <View style={[styles.leaderboardCard, { borderLeftColor: getRankColor(rank) }]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankIcon, { color: getRankColor(rank) }]} selectable={false}>
            {getRankIcon(rank)}
          </Text>
        </View>
        
        <View style={styles.leaderboardContent}>
          <View style={styles.leaderboardHeader}>
            <View style={styles.nameCodeContainer}>
              <Text style={styles.leaderboardName} selectable={false}>{item.name}</Text>
              <Text style={styles.leaderboardCode} selectable={false}>{item.referralCode}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText} selectable={false}>{item.points}</Text>
              <Text style={styles.pointsLabel} selectable={false}>people</Text>
            </View>
          </View>
          
          {item.referrals.length > 0 && (
            <View style={styles.referralsContainer}>
              <Text style={styles.referralsLabel} selectable={false}>Referred:</Text>
              <Text style={styles.referralsList} selectable={false}>{item.referrals.join(', ')}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getCardColor = (index) => {
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    return colors[index % colors.length];
  };

  const StatCard = ({ icon, title, value, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Icon name={icon} size={24} color={color} />
      <View style={styles.statContent}>
        <Text style={styles.statValue} selectable={false}>{value}</Text>
        <Text style={styles.statTitle} selectable={false}>{title}</Text>
      </View>
    </View>
  );

  const ExplanationModal = () => (
    <Modal
      visible={showExplanation}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowExplanation(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} selectable={false}>Daydream Omaha Referral Program</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowExplanation(false)}
          >
            <Text style={styles.closeButtonText} selectable={false}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.modalContent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          bounces={false}
        >
          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>What is it?</Text>
            <Text style={styles.explanationText} selectable={false}>
              The Daydream Omaha Referral Program lets you invite friends to join the hackathon. 
              It is a fun way to grow the community, build your team, and win awesome prizes just for spreading the word.
            </Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>What if they don't know how to code?</Text>
            <Text style={styles.explanationText} selectable={false}>
              No problem at all. Daydream Omaha is beginner-friendly. We will host workshops that teach 
              attendees how to code and even publish their own game on itch.io. Everyone is welcome, no experience needed.
            </Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>How do I win?</Text>
            <Text style={styles.explanationText} selectable={false}>
              You will win based on the number of people you refer who actually show up to Daydream Omaha.
            </Text>
            <Text style={styles.explanationBullet} selectable={false}>• Only attendees who check in at Daydream Omaha count (not other Daydream locations).</Text>
            <Text style={styles.explanationBullet} selectable={false}>• No ghost signups — your referrals must attend the event.</Text>
            <Text style={styles.explanationBullet} selectable={false}>• Track referrals using your custom referral link or code (details soon).</Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>🏆 Prizes</Text>
            
            <Text style={styles.explanationSubtitle} selectable={false}>Top Referrers</Text>
            <Text style={styles.explanationBullet} selectable={false}>• 1st Place: Flipper Zero</Text>
            <Text style={styles.explanationBullet} selectable={false}>• Top 5 Referrers: Raspberry Pi 4</Text>
            
            <Text style={styles.explanationSubtitle} selectable={false}>5+ Referrals: Sticker + Patch Reward Pack</Text>
            <Text style={styles.explanationText} selectable={false}>
              Refer at least 5 people who attend and get an exclusive Daydream Referral Reward Pack:
            </Text>
            <Text style={styles.explanationBullet} selectable={false}>• 1 Embroidered Patch – Custom Daydream Omaha or hacker-themed</Text>
            <Text style={styles.explanationBullet} selectable={false}>• 3 to 5 Premium Vinyl Stickers – Weatherproof, high-quality, and limited edition</Text>
            <Text style={styles.explanationBullet} selectable={false}>• Comes in collectible packaging</Text>
            <Text style={styles.explanationText} selectable={false}>
              These will not be available anywhere else, only for our top community builders.
            </Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>⏰ Referral Deadline</Text>
            <Text style={styles.explanationText} selectable={false}>
              All referrals must be made before September 8th to count toward rewards and prizes. 
              After that, the leaderboard will be locked and winners will be announced during the event.
            </Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationTitle} selectable={false}>❓ Frequently Asked Questions</Text>
            
            <Text style={styles.faqQuestion} selectable={false}>How do I refer someone?</Text>
            <Text style={styles.faqAnswer} selectable={false}>
              Once you register for Daydream Omaha, you will get a unique referral link or code. 
              Share it with your friends. If they sign up using your link and show up, it counts.
            </Text>
            
            <Text style={styles.faqQuestion} selectable={false}>Can I refer someone who already signed up?</Text>
            <Text style={styles.faqAnswer} selectable={false}>
              Only if they have not been referred yet. If they registered without a referral, 
              they may be able to edit their signup to include your code. Check with the organizers.
            </Text>
            
            <Text style={styles.faqQuestion} selectable={false}>What if my friend signs up but does not attend?</Text>
            <Text style={styles.faqAnswer} selectable={false}>
              They will not count toward your referral total. Only attendees who check in at 
              Daydream Omaha on event day will count.
            </Text>
            
            <Text style={styles.faqQuestion} selectable={false}>Is there a limit to how many people I can refer?</Text>
            <Text style={styles.faqAnswer} selectable={false}>
              No. Refer as many as you want. The more you bring, the better your chances of winning prizes.
            </Text>
            
            <Text style={styles.faqQuestion} selectable={false}>When do I get my prize?</Text>
            <Text style={styles.faqAnswer} selectable={false}>
              Prizes will be handed out during the closing ceremony at Daydream Omaha. 
              If you have to leave early, contact an organizer.
            </Text>
          </View>

          <View style={styles.explanationSection}>
            <Text style={styles.explanationText} selectable={false}>
              If you have any more questions email us at daydream@saitrseelam.com.
            </Text>
            <Text style={styles.explanationText} selectable={false}>
              Start sharing and get your friends excited. The more you refer, the better your chances. 
              Let us make Daydream Omaha unforgettable.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#40709A" />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        scrollEnabled={true}
        bounces={false}
      >
        {/* Header with explanation button */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle} selectable={false}>Referral Dashboard</Text>
          <TouchableOpacity 
            style={styles.explanationButton}
            onPress={() => setShowExplanation(true)}
          >
            <Icon name="people" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.explanationButtonText} selectable={false}>How It Works</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <StatCard
              icon="people-outline"
              title="Total Members"
              value={referrals.length}
              color="#44DBC8"
            />
            <StatCard
              icon="trophy-outline"
              title="Total Referred"
              value={leaderboard.reduce((sum, person) => sum + person.points, 0)}
              color="#44DBC8"
            />
          </View>
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle} selectable={false}>🏆 Leaderboard</Text>
          <FlatList
            data={leaderboard}
            renderItem={({ item, index }) => (
              <LeaderboardCard item={item} index={index} rank={index + 1} />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <ExplanationModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
  },
  scrollContentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 50,
  },
  statsSection: {
    marginVertical: 20,
    width: '100%',
    maxWidth: 600,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'nowrap',
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    minWidth: 0,
    maxWidth: 290,
  },
  statContent: {
    marginLeft: 15,
    flex: 1,
    minWidth: 0,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statTitle: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2,
  },
  referralsSection: {
    marginBottom: 30,
  },
  leaderboardSection: {
    marginBottom: 30,
    width: '100%',
    maxWidth: 600,
  },
  leaderboardCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '100%',
  },
  rankContainer: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  rankIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  leaderboardContent: {
    flex: 1,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameCodeContainer: {
    flex: 1,
    minWidth: 0,
  },
  leaderboardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  leaderboardCode: {
    fontSize: 16,
    color: '#44DBC8',
    fontWeight: '600',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: '#40709A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#44DBC8',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  referralsContainer: {
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    borderColor: '#44DBC8',
    borderWidth: 1,
  },
  referralsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#44DBC8',
    marginBottom: 2,
  },
  referralsList: {
    fontSize: 12,
    color: '#fff',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    maxWidth: 600,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  explanationButton: {
    backgroundColor: '#44DBC8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  explanationButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#2a2a2a',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  explanationSection: {
    marginBottom: 24,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#44DBC8',
    marginBottom: 12,
  },
  explanationSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 20,
    marginBottom: 8,
  },
  explanationBullet: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 20,
    marginLeft: 12,
    marginBottom: 4,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#bbb',
    lineHeight: 20,
    marginBottom: 8,
  },
});
