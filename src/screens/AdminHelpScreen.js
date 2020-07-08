import React, { useState, useEffect, useCallback } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Button } from 'react-native-elements';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { theme } from '../core/theme';
import { connect } from 'react-redux';
import { adminHelpRequest } from '../actions/index'
import axios from "axios";
import config from '../config/index.js'


const Showdata = ({ si, dt, sdt, inp, inpdt }) => {


    if (si === 0) {
        return (
            <ScrollView>
                <TouchableOpacity>
                    {dt.map(j => (
                        <Card >
                            <CardTitle

                                color={theme.colors.primary}
                            />
                            <CardContent ><Text ><b>Student Id:</b> {j.Student_Id}</Text></CardContent>
                            <CardContent ><Text ><b>Name:</b> {j.Name}</Text></CardContent>
                            <CardContent ><Text><b>Problem Type:</b> {j.Problem_Type}</Text></CardContent>
                            <CardContent ><Text ><b>Problem Description:</b> {j.Problem_description}</Text></CardContent>
                            <CardContent ><Text><b>Other Details:</b> {j.Other_Details}</Text></CardContent>
                            <CardContent ><Text><b>Phone No:</b> {j.Phone_No}</Text></CardContent>
                            <CardAction
                                separator={true}
                                inColumn={false}>
                                <CardButton
                                    onPress={() => {
                                        Alert.alert(
                                            "Status Updated",
                                            [{ text: "OK", onPress: () => console.log('OK Pressed') }],
                                            { cancelable: false }
                                        )
                                        inpdt([...inp, j])
                                        axios.put(config.baseurl+`/api/v1/update/${j.Student_Id}/${j.Request_Status}`)
                                            .then(response => console.log(response))
                                            .catch(err => { setiserror(true), console.log(err) })

                                        sdt(dt.filter(obj => j.Student_Id !== obj.Student_Id))

                                    }}

                                    title="In-progress"
                                    color={theme.colors.primary}
                                />
                                {/* <CardButton
                                    onPress={() => { }}
                                    title="Attended"
                                    color={theme.colors.primary}
                                /> */}
                            </CardAction>
                        </Card>
                    )
                    )
                    }
                </TouchableOpacity>
            </ScrollView>
        )
    }
    else {
        if (inp.length < 1) {
            return (
                <ScrollView>
                    <Text>NO-DATA</Text>
                </ScrollView>
            )
        }
        else {
            return (
                <ScrollView>
                    <TouchableOpacity>
                        {inp.map(j => (
                            <Card>
                                <CardTitle
                                />
                                <CardContent ><Text ><b>Student Id:</b> {j.Student_Id}</Text></CardContent>
                                <CardContent ><Text ><b>Name:</b> {j.Name}</Text></CardContent>
                                <CardContent ><Text><b>Problem Type:</b> {j.Problem_Type}</Text></CardContent>
                                <CardContent ><Text ><b>Problem Description:</b> {j.Problem_description}</Text></CardContent>
                                <CardContent ><Text><b>Other Details: </b></Text></CardContent>
                                <CardContent ><Text><b>Phone No: </b>{j.Phone_No}</Text></CardContent>
                                <CardAction
                                    separator={true}
                                    inColumn={false}>

                                    <CardButton
                                        onPress={() => {
                                            Alert.alert(
                                                "Status Updated", "",
                                                [{ text: "OK" }],
                                                { cancelable: false }
                                            )
                                            axios.put(config.baseurl+`/api/v1/update/${j.Student_Id}/${j.Request_Status}`)
                                                .then(response => console.log(response))
                                                .catch(err => { setiserror(true) })
                                            inpdt(inp.filter(obj => j.Student_Id !== obj.Student_Id))
                                        }}
                                        title="Attended"
                                        color={theme.colors.primary}
                                    />
                                </CardAction>
                            </Card>
                        )
                        )
                        }
                    </TouchableOpacity>
                </ScrollView>
            )
        }

    }
}

const AdminHelpScreen = ({ navigation, adhreq }) => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [data, setData] = useState([]);
    const [inprogressdata, setinprogressdata] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [iserror, setiserror] = useState(false);

    const handleSingleIndexSelect = (index) => {
        setSelectedIndex(index)
        console.log(selectedIndex)
    }

    const FilterData = (res) => {
        var da_ta = res.data.filter(i => (i.Request_Status === "New"))
        setData(da_ta)
    }
    const FilterInprogressData = (res) => {
        var inprogress_data = res.data.filter(j => (j.Request_Status === "InProgress"))
        setinprogressdata(inprogress_data)
    }

    useEffect(() => {
        setisloading(true);
        getAllAdminHelpRequests();
    }, [])

    const getAllAdminHelpRequests = async () => {
        try {

            const response = await axios.get(config.baseurl+"/api/v1/adminhelp/")
            // setData(response.data)
            FilterData(response);
            FilterInprogressData(response);
            setisloading(false);
            adminHelpRequest(response.data)
            console.log(adhreq)
        }
        catch (err) {
            setiserror(true);
            adminHelpRequest('')
        }
    }


    if (!isloading && !iserror) {
        return (
            <Background>
                <BackButton goBack={() => navigation.navigate('HomeScreen')} />
                <ScrollView>
                    <Logo />
                    <TouchableOpacity>
                        <View >
                            <SegmentedControlTab
                                values={['New Requests', 'In Progress']}
                                selectedIndex={selectedIndex}
                                badges={[data.length, inprogressdata.length]}
                                tabStyle={styles.tabStyle}
                                activeTabStyle={styles.activeTabStyle}
                                onTabPress={handleSingleIndexSelect}
                            />
                        </View>
                        <Text>
                            DRF-Admin Help Page
                    </Text>
                        <Showdata si={selectedIndex} dt={data} sdt={setData} inp={inprogressdata} inpdt={setinprogressdata} />
                    </TouchableOpacity>
                </ScrollView>
            </Background>
        )
    }

    if (isloading) {
        return (<View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>)
    }
    if (iserror) {
        return (<View style={[styles.container]}>
            <Icon name="thumbs-down" size={50} color={theme.colors.secondary} />
            <Text>"ERROR GETTING DATA"</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10
    },

    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

    tabContent: {
        color: '#444444',
        fontSize: 18,
        margin: 24

    },
    Seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24
    },
    tabStyle: {
        flex: 1,
        borderColor: theme.colors.primary,
        borderRadius: 2,
        paddingLeft: 45,
        paddingRight: 45
    },
    activeTabStyle: {
        backgroundColor: theme.colors.primary
    },
});

const mapStateToProps = state => {
    return {
        adhreq: state.helpRequestAdmin.adminHelp,
    };
};

export default connect(mapStateToProps, { adminHelpRequest })(AdminHelpScreen);