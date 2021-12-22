
class FiveLiveIdents {
    
    constructor() {

    }

    get_job_name(job_id) {

        switch(job_id) {
            case 0: return "Безработный"; break;
            case 1: return "Таксист"; break;
            case 2: return "Водитель автобуса"; break;
            case 3: return "Механик"; break;
            case 4: return "Курьер"; break;
            case 5: return "Дальнобойщик"; break;
        }

    }

    get_fraction_name(fraction_id) {

        switch(fraction_id) {
            case 0: return "Не состоит"; break;
            case 1: return "United States National Guard"; break;
            case 2: return "Los Santos Police Department"; break;
            case 3: return "Weazel News"; break;
            case 4: return "Los Santos Emergency Medical Service"; break;
            case 5: return "Los Santos Licensing Department"; break;
            case 6: return "Los Santos City Hall"; break;
        }

    }

    get_gang_name(gang_id) {

        switch(gang_id) {
            case 0: return "Не состоит"; break;
            case 1: return "The Families"; break;
            case 2: return "The Ballas Gang"; break;
            case 3: return "Los Santos Vagos"; break;
            case 4: return "Marabunta Grande"; break;
            case 5: return "The Bloods"; break;
            case 6: return "Русская мафия"; break;
            case 7: return "Армянская мафия"; break;
            case 8: return "La Cosa Nostra"; break;
        }

    }

}