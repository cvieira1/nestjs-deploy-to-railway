
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator"
import { plainToInstance } from "class-transformer"

enum Environment{

    Development="development",
    Production="production",
    Test="test",
    Provision="provision"

}

class EnvironmentVariables{

    @IsEnum(Environment)
    NODE_ENV: Environment

    @IsNumber()
    DB_PORT: number

    @IsString()
    DB_HOST: string

    @IsString()
    DB_USERNAME: string

    @IsString()
    DB_PASSWORD: string

    @IsString()
    DB_NAME: string

    @IsString()
    SECRET: string

    @IsNumber()
    PORT: number

}

export function validate(config: Record<string, unknown>){

    console.log("config", config);
    
    const validateConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true })

    console.log(validateConfig);
    

    const errors = validateSync(validateConfig, { skipMissingProperties: false })

    if(errors.length > 0){

        throw new Error(errors.toString())

    }

    return validateConfig

}