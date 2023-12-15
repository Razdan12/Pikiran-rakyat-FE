<template>
  <q-page>
    <div class="q-my-md">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <q-card class="full-width">
            <q-card-section>
              <p class="text-center text-bold" style="font-size: large;">MEDIA ORDER </p>
              <q-separator class="q-my-md" color="light-blue-7" inset />
              <div>
                <q-markup-table>
                  <thead>
                    <tr>
                      <th class="text-left">No</th>
                      <th class="text-right">Client</th>
                      <th class="text-right">Tanggal Order</th>
                      <th class="text-right">No Quotation</th>
                      <th class="text-right">Periode</th>
                      <th class="text-right">Media Order</th>
                      <th class="text-right">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">1</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023 </td>
                      <td class="text-right">
                        <q-btn color="secondary" label="MO" to="/mo" />
                      </td>

                    </tr>
                    <tr>
                      <td class="text-left">1</td>
                      <td class="text-right">Locus</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">292/Q-LCS/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/MO-LCS/PRMN/VIII/2023 </td>
                      <td class="text-right">
                        <q-btn color="secondary" label="MO" to="/mo" />
                      </td>

                    </tr>
                    <tr>
                      <td class="text-left">3</td>
                      <td class="text-right">Curaweda</td>
                      <td class="text-right">17 November 2023</td>
                      <td class="text-right">293/Q-CRW/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/Q-CRW/PRMN/VIII/2023 </td>
                      <td class="text-right">
                        <q-btn color="secondary" label="MO" to="/mo" />
                      </td>

                    </tr>
                    <tr>
                      <td class="text-left">4</td>
                      <td class="text-right">Nabati</td>
                      <td class="text-right">16 November 2023</td>
                      <td class="text-right">294/Q-NBT/PRMN/VIII/2023</td>
                      <td class="text-right">November 2023 - Desember 2023</td>
                      <td class="text-right">291/MO-NBT/PRMN/VIII/2023 </td>
                      <td class="text-right">
                        <q-btn color="secondary" label="MO" to="/mo" />
                      </td>

                    </tr>

                  </tbody>
                </q-markup-table>
              </div>



            </q-card-section>
          </q-card>

        </div>
        <div class="col-md-1"></div>
      </div>

    </div>
  </q-page>
</template>
