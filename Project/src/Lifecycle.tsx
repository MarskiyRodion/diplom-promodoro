import React from "react";

interface ILifecycleProps {
    someProp: number;
}

interface ILifecycleState {
    stateField: number;
}

export class Lifecycle extends React.Component<ILifecycleProps, ILifecycleState>{
    constructor(props: ILifecycleProps) {
        super(props);

        this.state = { stateField: 0 };
        // this.handleClick = this.handleClick.bind(this)
    }

    static getDerivedStateFromProps( props: Readonly<ILifecycleProps>, state: Readonly<ILifecycleState> ) {
        return { stateField: props.someProp };
        // return null;
    }

    public render() {
        return <div onClick={this.handleClick}>1</div>
    }


    private handleClick = () => {
        this.setState({ stateField: 1 });
    }
}