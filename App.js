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
      <TouchableOpacity style={[styles.leaderboardCard, { borderLeftColor: getRankColor(rank) }]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankIcon, { color: getRankColor(rank) }]}>
            {getRankIcon(rank)}
          </Text>
        </View>
        
        <View style={styles.leaderboardContent}>
          <View style={styles.leaderboardHeader}>
            <View style={styles.nameCodeContainer}>
              <Text style={styles.leaderboardName}>{item.name}</Text>
              <Text style={styles.leaderboardCode}>{item.referralCode}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsText}>{item.points}</Text>
              <Text style={styles.pointsLabel}>people</Text>
            </View>
          </View>
          
          {item.referrals.length > 0 && (
            <View style={styles.referralsContainer}>
              <Text style={styles.referralsLabel}>Referred:</Text>
              <Text style={styles.referralsList}>{item.referrals.join(', ')}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
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
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#40709A" />

      <ScrollView style={styles.content}>
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
          <Text style={styles.sectionTitle}>🏆 Leaderboard</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsSection: {
    marginVertical: 20,
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
  },
  statContent: {
    marginLeft: 15,
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
  },
  leaderboardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  leaderboardCode: {
    fontSize: 16,
    color: '#44DBC8',
    fontWeight: '600',
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
});
