export function createWhereClause(params,
                                  database,
                                  prefix = '',
                                  omitWhere = false,
                                  omitAnd = true) {
    if (Object.keys(params).length !== 0) {
        let query = omitWhere ? '' : 'WHERE '
        for (let [k, v] of Object.entries(params)) {
            if (v)
                query += `${prefix}${database.escapeId(k)} = ${database.escape(v)} AND `
        }
        // Remove trailing 'AND '
        return omitAnd ? query.substring(0, query.length - 4) : query
    }
    return ""
}
