import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { tournarmentMockData } from '../../mockData/brackets';


interface RoundProps extends Match{
    currentCol:boolean
    roundNumber:number
}

interface Round {
    rounds:Match[]
}

interface Match{
    title?:string,
    matches:Teams[]
}

interface Teams {
    homeTeam:string,
    homeTeamScore:number,
    homeTeamImageUrl:string,
    awayTeam:string,
    awayTeamScore:number,
    awayTeamImageUrl:string
}

enum RoundTitles{
    ROUND_OF_SIXTEEN = "Round of 16",
    QUARTER_FINALS = "Quarter-finals",
    SEMI_FINALS = "Semi-finals",
    FINALS = "Finals"
}

const Match  = ({ homeTeam, homeTeamScore,homeTeamImageUrl, awayTeam, awayTeamScore,awayTeamImageUrl }:Teams) =>  {
  return (
    <TouchableOpacity>
      <View style={styles.matchContainer}>
        <View style={styles.teamScore}>
            <View style={styles.imageStyle}>
            <Image source={{uri:homeTeamImageUrl}} width={20} height={20}/>
            </View>
            <Text style={styles.textStyle}>{homeTeam}</Text>
            <Text style={styles.textStyle}>{homeTeamScore}</Text>
        </View>
        <View style={styles.teamScore}>
            <Image source={{uri:awayTeamImageUrl}} style={styles.imageStyle}/>
            <Text style={styles.textStyle}>{awayTeam}</Text>
            <Text style={styles.textStyle}>{awayTeamScore}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Round = ({ matches,title,roundNumber }:RoundProps) => {


    
  return (
    <View style={styles.roundContainer}>
      {matches.map((match, index) => (
        <View>
            {
            title != RoundTitles.FINALS &&
             <View style={[styles.connecter,styles.connectorRight]}/>
            }
            {
            title != RoundTitles.ROUND_OF_SIXTEEN  &&
            <View style={[styles.connecter,styles.connectorLeft]}/>
            }
            {
            title != RoundTitles.FINALS && index % 2 == 0 &&
            <View style={[styles.connectorVertical,{height: roundNumber == 0 ? 102 : (201 * roundNumber)}]}/>
            }
            <View>
                <Match key={index} {...match} />
            </View>
        </View>

      ))}

     );
    </View>
  );
};



export const BracketScreen = () => { 

    const scrollRef = React.createRef<ScrollView>()
    const [clickedIndex,setClickedIndex] = useState(0)
    const columnWidth = 150
    const [tournamentData] = useState<Round>(tournarmentMockData)

    const handleScrollIndex = (index:number) => {

        const offset =  index * columnWidth
        scrollRef.current?.scrollTo({x:offset,animated:true})
        setTimeout(() =>{

            setClickedIndex(index)
        },500)

    }

    const scrollIndex = (index:number) =>{
        const currentIndex = (index / columnWidth ).toFixed(0)

        setClickedIndex(Number(currentIndex))

    }
  return (
    <View style={{flex:1,backgroundColor:'rgba(9,9,71,1)'}}>
        <ScrollView 
            style={{flexDirection:'row'}} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            
            >
        {
        tournamentData.rounds.map(({title},index) =>(

            <TouchableOpacity key={index} style={clickedIndex == index ? styles.buttonClicked:styles.buttonStyle} onPress={() => handleScrollIndex(index)}>
                <Text style={clickedIndex == index ?styles.buttonClickedTxtStyle: styles.textStyle}>
                    {title}
                </Text>
            </TouchableOpacity>

        ))
      }  
        </ScrollView>

    <ScrollView>
    <ScrollView 
        style={[styles.tournamentContainer]} 
        horizontal={true} 
        ref={scrollRef} 
        onScroll={(e) => scrollIndex(e.nativeEvent.contentOffset.x)}
        showsHorizontalScrollIndicator={false}
    >
   
      {tournamentData.rounds.map(({matches,title}, index) => (
            <View>
                <Round key={index} matches={matches} currentCol={index == clickedIndex} title={title} roundNumber={index}/>
            </View>
      ))}
    </ScrollView>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    matchContainer:{
       width:180,
       height:90,
       opacity:0.9,
       backgroundColor: 'rgba(15,37,105,1)',
       justifyContent:'center',
       alignSelf:'center',
       marginVertical:5,
       borderWidth:1,
       borderRadius:15
    },
    connecter:{
        width: 10,
        height: 3,
        backgroundColor: 'grey',
        position:'absolute',
        opacity:0.7

    },
    connectorVertical:{
        width: 3,
        backgroundColor: 'grey',
        left:189,
        top:50,
        position:'absolute',
        opacity:0.7,
        borderTopRightRadius:40,
        borderBottomRightRadius:40
    
    },
    connectorLeft:{
        right:180,
        bottom:48,
    },
    connectorRight:{
        left:180,
        bottom:48,
        borderTopRightRadius:40,
        borderBottomRightRadius:40


    },
    roundContainer:{
        flex:1,
        marginHorizontal:10,
        justifyContent:'space-around',
        alignContent:'center'
    },

    currentRoundContainer:{
        flex:1,
        margin:30,
        justifyContent:'center'
    },
    tournamentContainer:{ 
        flex:1,
        backgroundColor:'rgba(9,9,71,1)',

    },
    teamScore:{
        flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',paddingVertical:5
    },
    textStyle:{
        color:'white',
        fontSize:14,
        fontWeight:'700'
    },
    imageStyle:{
        height:20,width:20,
        resizeMode:'cover',
        borderRadius:50,
        borderColor:'white',
        borderWidth:2
        
    },
    buttonClickedTxtStyle:{
        color:'black',
        fontSize:14,
        fontWeight:'700'
    },
    buttonStyle:{
        height:30,
        backgroundColor:'rgba(15,37,105,1)',
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:9,
        paddingHorizontal:10
    },
    buttonClicked:{
        backgroundColor:'rgba(157,158,16,1)',
        height:30,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:9,
        paddingHorizontal:10
    }

})