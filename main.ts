#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


interface AccountInfo {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number
    [key: number]: AccountInfo


}
console.log(chalk.yellow.italic("----------welcome to my bank-------------\nBank account numbers\n1) 1234\n2) 5678\n3) 1122\n4) 3344"))
class Customers {
    customers: AccountInfo;
    constructor(Fname: string, Lname: string, gender: string, age: number, Mnumber: number) {
        this.customers = { firstName: Fname, lastName: Lname, gender: gender, age: age, mobileNumber: Mnumber }
    }
    displayInfo() {
        for (let key in this.customers) {
            console.log(`${chalk.italic(key)}:${chalk.italic.yellow(this.customers[key])}`)
        }
    }

}
class MyBank {
    accountBalance: number;
    constructor(accountBalance: number) {
        this.accountBalance = accountBalance
    }
    debitMoney(amount: number) {
        if (amount < this.accountBalance) {
            let balance: number = this.accountBalance
            balance -= amount
            this.accountBalance = balance
            console.log(chalk.italic.yellow(`cash debited successfully\namount debited:${chalk.whiteBright(amount)}\ncurrent balance is:${chalk.whiteBright(this.accountBalance)}`))
        }
        else {
            console.log(chalk.red("insufficiant balance"))
        }

    }
    craditMoney(amount: number) {
        if (amount < this.accountBalance) {
            if (amount > 100) {
                let charges = 100
                let balance = this.accountBalance
                balance -= amount + charges
                this.accountBalance = balance
                console.log(chalk.italic.yellow(`cash cradited successfully\namount cradited:${chalk.whiteBright(amount)}\ncharges:${chalk.whiteBright(charges)} \ncurrent balance is:${chalk.whiteBright(this.accountBalance)}`))

            }
            else {
                let balance = this.accountBalance
                balance -= amount
                this.accountBalance = balance
                console.log(chalk.italic.yellow(`cash cradited successfully\namount cradited:${chalk.whiteBright(amount)}\ncurrent balance is:${chalk.whiteBright(this.accountBalance)}`))

            }
        }
        else {
            console.log(chalk.red("insufficiant balance"))
        }


    }
    checkBalance() {
        console.log(chalk.italic.yellow(`your current account balance is:${chalk.whiteBright(this.accountBalance)}`))
    }
}
let customer: MyBank = new MyBank(10000)
let viewInfo = async (userId: number) => {
    let accountsInfo: {
        [key: number]: AccountInfo

    } = {
        1234: {

            firstName: "rimshah",
            lastName: "syed",
            gender: "female",
            age: 19,
            mobileNumber: 3009876201
        },

        5678: {
            firstName: "simba",
            lastName: "rimi",
            gender: "male",
            age: 1,
            mobileNumber: 923303673301
        },

        1122: {
            firstName: "aunshah",
            lastName: "Syed",
            gender: "female",
            age: 14,
            mobileNumber: 92301066601
        },
        3344: {
            firstName: "rameez",
            lastName: "Syed",
            gender: "male",
            age: 18,
            mobileNumber: 923098055601
        },

    }
    let userInfo = accountsInfo[userId]
    let customerInfo: Customers = new Customers(userInfo.firstName, userInfo.lastName, userInfo.gender, userInfo.age, userInfo.mobileNumber)
    customerInfo.displayInfo()

}
async function main() {
    let customersAccountNums: number[] = [1234, 5678, 1122, 3344]
    let checkAccountNum = await inquirer.prompt({ name: "id", message: chalk.italic.whiteBright("Enter your account number"), type: "number" })
    if (!isNaN(checkAccountNum.id)) {
        if (customersAccountNums.includes(checkAccountNum.id)) {
            let flage = true
            while (flage) {
                let userResponse = await inquirer.prompt({ name: "choice", message: chalk.italic.bold("Select any option below "), type: "list", choices: [chalk.whiteBright("View customer info"), chalk.whiteBright("Debit money"), chalk.whiteBright("Cradit moeny"), chalk.whiteBright("Check balance"), chalk.whiteBright("Quit")] })
                switch (userResponse.choice) {
                    case chalk.whiteBright("View customer info"):
                        viewInfo(checkAccountNum.id)
                        break
                    case chalk.whiteBright("Debit money"):
                        let getDebitAmount = await inquirer.prompt({ name: "amount", message: chalk.italic.whiteBright("Enter amount that you want to debit"), type: "number" })
                        if (!isNaN(getDebitAmount.amount)) {

                            customer.debitMoney(getDebitAmount.amount)
                        } else {
                            console.log(chalk.red("Please enter valid id"))
                        }
                        break
                    case chalk.whiteBright("Cradit moeny"):
                        let getCraditAmount = await inquirer.prompt({ name: "amount", message: chalk.italic.whiteBright("Enter amount that you want to debit"), type: "number" })
                        if (!isNaN(getCraditAmount.amount)) {
                            customer.craditMoney(getCraditAmount.amount)

                        } else {
                            console.log(chalk.red("Please enter valid id"))
                        }

                        break;
                    case chalk.whiteBright("Check balance"):
                        customer.checkBalance()
                        break;
                    case chalk.whiteBright("Quit"):
                        flage = false;
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            console.log(chalk.red("Account number didn't match"))
        }

    }
    else {
        console.log(chalk.red("Please enter valid id"))
    }





}
main()
