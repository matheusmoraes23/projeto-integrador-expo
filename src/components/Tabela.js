import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
    return (
        <>
            <View style={styles.tableRowHeader}>
                <View style={styles.tableColumnHeader}>
                    <Text style={styles.textHeader}>Quadro: {item.quadro}</Text>
                </View>
            </View>

            <View style={styles.tableRow}>
                <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>Possui rainha?</Text>
                </View>
                <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>2 Hrs</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>Trabalho Quadro?</Text>
                </View>
                <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>4.5 Hrs</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>Problema Quadro?</Text>
                </View>
                <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>3.5 Hrs</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>Ação posterior?</Text>
                </View>
                <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>3.5 Hrs</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headerManejo: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        // backgroundColor: "#000000",
        flex: 1,
        padding: 10
    },
    tableColumnHeader: {
        alignItems: "center",
        backgroundColor: "#1FE0A2",
        flex: 5,
        justifyContent: "center"
    },
    tableColumnClockInOutTimes: {
        alignItems: "center",
        // backgroundColor: "#000000",
        flex: 3,
        justifyContent: "center",
        margin: 1
    },
    tableColumnTotals: {
        alignItems: "center",
        // backgroundColor: "#000000",
        flex: 2,
        justifyContent: "center",
        margin: 1
    },
    tableRow: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 30
    },
    tableRowHeader: {
        flex: 5,
        flexDirection: "row",
        maxHeight: 40
    },
    tableContainer: {
        // backgroundColor: "#202020",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        padding: 10,
        // marginBottom:
        // paddingBottom: 10
    },
    textHeader: {
        color: "#000000",
        fontWeight: "bold"
    },
    textHeaderSubTitle: {
        color: "#000000",
        fontSize: 12
    },
    textLineItem: {
        color: "#000000"
    }
});