import { StatusCodes } from "http-status-codes";

interface ConstructorProps {
  name?: string;
  message: string;
  status?: StatusCodes;
}

class CustomError extends Error {
  public name: string;
  public status: StatusCodes;

  constructor(props: ConstructorProps) {
    super(props.message);
    this.name = props.name || "Error";
    this.status = props.status || StatusCodes.BAD_REQUEST;
  }
}

export default CustomError;
