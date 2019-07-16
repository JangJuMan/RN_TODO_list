import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput
} from "react-native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = { isEditing: false, toDoValue: props.text };
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        completeToDo: PropTypes.func.isRequired,
        uncompletedToDo: PropTypes.func.isRequired,
        updateToDo: PropTypes.func.isRequired,
        deleteToDo: PropTypes.func.isRequired,
    };

    state = {
        isEditing: false,
        toDoValue: ""
    };

    render() {
        const { isEditing, toDoValue } = this.state;
        const { id, text, deleteToDo, isCompleted } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View
                            style={[
                                styles.circle,
                                isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]} />
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controlInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                            underlineColorAndroid={"transparent"}
                        />
                    ) : (
                        <Text
                            style={[
                                styles.text,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                        >
                            {text}
                        </Text>
                    )}
                </View>
                {isEditing ? (
                    <View style={styles.action}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                    <Feather name="check" size={18} color="#353839" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                    <Feather name="edit-2" size={18} color="#353839" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={(event) => {
                            event.stopPropagation(); deleteToDo(id)}
                        }>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>
                                    <Feather name="delete" size={18} color="#353839" />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    _toggleComplete = event => {
        event.stopPropagation();
        const { isCompleted, completeToDo, uncompletedToDo, id } = this.props;
        if (isCompleted) {
            uncompletedToDo(id);
        } else {
            completeToDo(id);
        }
    }

    _startEditing = event => {
        event.stopPropagation();
        this.setState({
            isEditing: true
        });
    }

    _finishEditing = event => {
        event.stopPropagation();
        const { toDoValue } = this.state;
        const { id, updateToDo } = this.props;
        updateToDo(id, toDoValue);
        this.setState({
            isEditing: false
        });
    }

    _controlInput = text => {
        this.setState({
            toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#f23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 23,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        width: width / 2,
        flexDirection: "row",
        alignItems: "center",
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});

export default ToDo;