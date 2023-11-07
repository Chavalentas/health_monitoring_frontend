import { Fragment } from "react";
import { NoPageProps } from "../../props/NoPage.Props";

const NoPage = (noPageProps: NoPageProps) => {
    return (
        <Fragment>
            <h1>{noPageProps.errorMessage}</h1>
        </Fragment>
    );
}

export default NoPage;