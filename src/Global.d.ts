declare module "*.module.css"

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: any;
  export = value;
}