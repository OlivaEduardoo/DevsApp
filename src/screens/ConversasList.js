import React, {  Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getChatList, setActiveChat } from '../actions/ChatActions';

import ConversasItem from './ConversasItem';

export class ConversasList extends Component {

    static navigationOptions = {
        title:'Conversas',
        tabBarLabel:'Conversas'
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.props.getChatList( this.props.uid );
        this.conversaClick = this.conversaClick.bind(this);
    }

    componentDidUpdate() {
        if(this.props.activeChat != '') {
            this.props.navigation.navigate("ConversaInterna");
        }
    }

    conversaClick (data) {
        this.props.setActiveChat( data.key );
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                data={this.props.chats}
                renderItem={({item})=><ConversasItem data={item} onPress={this.conversaClick} />}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        margin:10
    }
});

const mapStateToProps = (state) => {
    return {
        uid:state.auth.uid,
        status:state.auth.status,
        activeChat:state.chat.activeChat,
        chats:state.chat.chats
    };
};

const ConversasListConnect = connect(mapStateToProps, { getChatList, setActiveChat })(ConversasList);
export default ConversasListConnect;